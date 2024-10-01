# model.py
import torch
from torchvision import models
from torchvision.models import ResNet50_Weights
from PIL import Image

# Load the weights
weights = ResNet50_Weights.DEFAULT  # Or specify a specific weight like IMAGENET1K_V1
model = models.resnet50(weights=weights)
model.eval()

# Define the image transformations
preprocess = weights.transforms()

# Get the class labels
labels = weights.meta["categories"]

def model_predict(img_path):
    image = Image.open(img_path).convert('RGB')
    # Apply the preprocessing transforms
    image = preprocess(image)
    image = image.unsqueeze(0)  # Add batch dimension

    with torch.no_grad():
        outputs = model(image)
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)

    # Get the top 3 predictions
    top3_prob, top3_catid = torch.topk(probabilities, 3)
    results = []
    for i in range(top3_prob.size(0)):
        label = labels[top3_catid[i]]
        probability = top3_prob[i].item()
        results.append({
            'label': label,
            'probability': probability
        })
    return results