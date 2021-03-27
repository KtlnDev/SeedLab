#include <SPI.h>
#include <DHT.h>
#include <Ethernet.h>
#include <ArduinoJson.h>

#define COOLER 3
#define WATER_PUMP 4

byte mac[]={0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
IPAddress ip(192,168,1,10);
EthernetServer server(8080);
EthernetClient client;

DHT dht(2,DHT11);

const size_t CAPACITY = JSON_OBJECT_SIZE(2);
StaticJsonDocument<CAPACITY> doc;

char output[200];
float set_temperature = 21.5;
float set_soil_moisture = 20;

void set_regulation(float temp, float set_temp, byte actuator)
{
  if( temp >= set_temp){
    digitalWrite(actuator,LOW);
  }
  if( temp < set_temp){
    digitalWrite(actuator,HIGH);
  }
}

void setup() {
  Serial.begin(9600);
  Ethernet.begin(mac,ip);
  dht.begin();
  server.begin();
  Serial.print("server is at ");
  Serial.println(Ethernet.localIP()); 

  pinMode(COOLER,OUTPUT);
  digitalWrite(COOLER,HIGH);
}

void loop() {

  float h = dht.readHumidity( );
  float t = dht.readTemperature( );

  set_regulation(t,set_temperature,COOLER);

  JsonObject object = doc.to<JsonObject>();

  object["temperature"] = t;
  object["humidity"] = h;

  serializeJsonPretty(object,output);

  client = server.available();
  if (client) 
   {
      boolean currentLineIsBlank = true;
      while (client.connected ( ) ) 
        {
          if (client.available ( ) ) 
            {
              char character = client.read ( );
              Serial.write(character);
              if (character == '\n' && currentLineIsBlank) 
                {
                  client.println ("HTTP/1.1 200 OK");
                  client.println ("Content-Type: application/json");
                  client.println ("Connection: close");
                  client.println ("Refresh: 2");
                  client.println ( );
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
