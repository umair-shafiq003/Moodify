from transformers import BertTokenizer, TFBertForSequenceClassification
import tensorflow as tf

# Load the model and tokenizer
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = TFBertForSequenceClassification.from_pretrained("PATH_TO_MODEL")

def predict_mood(text):
    inputs = tokenizer(text, return_tensors="tf", truncation=True, padding=True)
    outputs = model(inputs)
    probabilities = tf.nn.softmax(outputs.logits, axis=-1)
    predicted_label = tf.argmax(probabilities, axis=1).numpy()[0]
    
    label_map = {0: "joy", 1: "sadness", 2: "neutral"}
    return label_map.get(predicted_label, "unknown")
