from rest_framework import serializers

class CsvDataSerializer(serializers.Serializer):
    date = serializers.DateTimeField()
    balance = serializers.FloatField()
    equity = serializers.FloatField()
    deposit = serializers.FloatField()

class ImportDataSerializer(serializers.Serializer):
    client_id = serializers.UUIDField()
    import_type = serializers.IntegerField()
    data = CsvDataSerializer(many=True)