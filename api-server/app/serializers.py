from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class CsvDataSerializer(serializers.Serializer):
    date = serializers.DateTimeField(required=True)
    balance = serializers.FloatField(required=True)
    equity = serializers.FloatField(required=True)
    deposit = serializers.FloatField(required=True)

class ImportDataSerializer(serializers.Serializer):
    import_name= serializers.IntegerField(required= True)
    import_type = serializers.IntegerField(required=True)
    data = CsvDataSerializer(many=True,required=True)
    
class ClientSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only = True, required=True)
    password_confirm = serializers.CharField(write_only = True, required = True)
    
    
class ClientLoginSerializer(serializers.Serializer):
    email= serializers.EmailField(required=True)
    password= serializers.CharField(write_only= True)

    def validate(self, data):
        if 'email' not in data or 'password' not in data:
            raise serializers.ValidationError("Email and password required")
        
        return data
    