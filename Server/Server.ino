#include <SPI.h>
#include <DHT.h>
#include <Ethernet.h>
#include <ArduinoJson.h>

#define COOLER 3
#define WATER_PUMP 4
#define LIGHT_BULB 5
#define echoPin 8
#define trigPin 9

byte mac[]={0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
IPAddress ip(192,168,1,6);
EthernetServer server(80);
EthernetClient client;

DHT dht(2,DHT11);

const size_t capacity_out = JSON_OBJECT_SIZE(8);
StaticJsonDocument<capacity_out> docOut;

const size_t capacity_in = JSON_OBJECT_SIZE(3);
DynamicJsonDocument docIn(capacity_in);

char output[200];
char command[200];
float duration_us, level;
float set_temperature = 40;
float set_soil_moisture = -1;
int control_light = 0;

int cooler_status;
int water_pump_status;
int light_bulb_status;

void temperature_regulation(float temp, float set_temp){
  if( temp >= set_temp){
    digitalWrite(COOLER,LOW);
    cooler_status = 1;
  }
  if( temp < set_temp){
    digitalWrite(COOLER,HIGH);
    cooler_status = 0;
  }
}

void switchLight( int lightIndicator){
  if(lightIndicator == 1){
    digitalWrite(LIGHT_BULB,LOW);
    light_bulb_status = 1;
  }
  else{
    digitalWrite(LIGHT_BULB,HIGH);
    light_bulb_status = 0;
  }
}

void soil_moisture_regulation(float soil_moisture, float set_soil_moisture){
  if( soil_moisture <= set_soil_moisture){
    digitalWrite(WATER_PUMP,LOW);
    water_pump_status = 1;
  }
  if( soil_moisture > set_soil_moisture){
    digitalWrite(WATER_PUMP,HIGH);
    water_pump_status = 0;
  }
}

float getWaterLevel(){
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration_us = pulseIn(echoPin, HIGH);
  level = 0.017 * duration_us;
  int water_level = map(level,1,7,100,0);
  return water_level;
}

void setup() {
  Serial.begin(9600);
  Ethernet.begin(mac,ip);
  dht.begin();
  server.begin();
  Serial.print("Server is up and running at ");
  Serial.println(Ethernet.localIP()); 

  pinMode(COOLER,OUTPUT);
  digitalWrite(COOLER,HIGH);
  pinMode(WATER_PUMP,OUTPUT);
  digitalWrite(WATER_PUMP,HIGH);
  pinMode(LIGHT_BULB,OUTPUT);
  digitalWrite(LIGHT_BULB,HIGH);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  delay(2000);
  float h = dht.readHumidity( );
  float t = dht.readTemperature( );
  int soilMoistureInput = analogRead(A0);
  int soilMoisture = map(soilMoistureInput,0,1023,100,0);
  int lightInput = analogRead(A1);
  int light = map(lightInput,0,1023,0,100);

  JsonObject object = docOut.to<JsonObject>();

  object["temperature"] = t;
  object["humidity"] = h;
  object["soil_moisture"] = soilMoisture;
  object["light"] = light;
  object["water_level"] = 0;
  object["cooler_status"] = cooler_status;
  object["water_pump_status"] = water_pump_status;
  object["light_bulb_status"] = light_bulb_status;

  serializeJsonPretty(object,output);

  client = server.available();
  if (client) 
   {
      boolean currentLineIsBlank = true;
      while (client.connected()) 
        {
          if (client.available()) 
            {
              char character = client.read();
              Serial.write(character);
              if (character == '\n' && currentLineIsBlank) 
                {
                  int index = 0;
                  while(client.available()){
                     command[index] = client.read();
                     index++;
                  }
                      
                  DeserializationError err = deserializeJson(docIn, command);
                  if (err) {
                    Serial.print(F("deserializeJson() failed with code "));
                    Serial.println(err.c_str());
                  }

                  set_temperature= docIn["temperature"];
                  set_soil_moisture = docIn["soilMoisture"];
                  control_light = docIn["light"];

                  temperature_regulation(t,set_temperature);
                  soil_moisture_regulation(soilMoisture,set_soil_moisture);
                  switchLight(control_light);
                                    
                  client.println("HTTP/1.1 200 OK");
                  client.println("Content-Type: application/json");
                  client.println("Access-Control-Allow-Origin: *");
                  client.println("Access-Control-Allow-Credentials: true");
                  client.println("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
                  client.println("Connection: close");
                  client.println("Refresh: 5");
                  client.println( );
                  client.print (output);
                  break;
                }
                 
                if ( character == '\n') 
                  {
                    currentLineIsBlank = true;
                  } 
                else if (character != '\r') 
                  {
                    currentLineIsBlank = false;
            }
        }
    }
    delay(1);
    client.stop();
  }
}
