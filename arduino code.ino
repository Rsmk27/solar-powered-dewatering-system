#include <Servo.h>
#define SOIL_PIN A0    
#define RELAY_PIN 12
#define LEFT_LDR 2
#define RIGHT_LDR 3
int threshold = 50.00; 

Servo servo;
int pos = 90;

// Variables for motor ON time calculation
unsigned long motorOnStartTime = 0;
unsigned long totalMotorOnTime = 0;
bool motorWasOn = false;

void setup() {
  servo.attach(9);
  pinMode(LEFT_LDR, INPUT);
  pinMode(RIGHT_LDR, INPUT); 
  servo.write(pos);
  pinMode(SOIL_PIN, INPUT);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH); 
  Serial.begin(9600);
  Serial.println("Started");
}

void loop() {
  int value = analogRead(SOIL_PIN);
  float percent = 100 - (value * 0.0714);
  
  bool motorIsOn = (percent > threshold);
  
  // Motor ON/OFF control
  if (motorIsOn) {
    digitalWrite(RELAY_PIN, HIGH); 
    
    // If motor was OFF and now turned ON, start timing
    if (!motorWasOn) {
      motorOnStartTime = millis();
      motorWasOn = true;
      Serial.println("Motor ON");
    }
    
    Serial.print("Moisture: ");
    Serial.print(percent);
    Serial.print("%, Motor ON Time: ");
    Serial.print((millis() - motorOnStartTime) / 1000);
    Serial.println(" seconds");
  } 
  else {
    digitalWrite(RELAY_PIN, LOW);
    
    // If motor was ON and now turned OFF, add to total time
    if (motorWasOn) {
      totalMotorOnTime += (millis() - motorOnStartTime);
      motorWasOn = false;
      Serial.println("Motor OFF");
    }
    
    Serial.print("Moisture: ");
    Serial.print(percent);
    Serial.print("%, Total Motor ON Time: ");
    Serial.print(totalMotorOnTime / 1000);
    Serial.println(" seconds");
  }

  delay(50);

  // Solar panel tracking
  if (digitalRead(LEFT_LDR) == LOW && pos < 135) pos++;  
  if (digitalRead(RIGHT_LDR) == LOW && pos > 45) pos--;  
  servo.write(pos);
  delay(20);
}
