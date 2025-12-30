from fastapi.testclient import TestClient
from app import app
import json

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
    print("Health check passed!")

def test_query():
    # Mocking the AgentController response might be needed if it's slow or requires external services
    # For now, we'll try a real request if the agent controller initializes successfully
    # If AgentController fails to init (e.g. missing API keys), the app might still run but return errors
    
    try:
        response = client.post(
            "/query",
            json={"text": "Hello, how are you?"}
        )
        print(f"Query Status Code: {response.status_code}")
        print(f"Query Response: {response.json()}")
        
        if response.status_code == 200:
            print("Query test passed!")
        else:
            print("Query test failed (non-200 status).")
            
    except Exception as e:
        print(f"Query test failed with exception: {e}")

if __name__ == "__main__":
    print("Running tests...")
    test_health()
    test_query()
