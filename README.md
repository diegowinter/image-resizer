# Image Resizer
API to resize images

## Endpoints

### `/resize`
Resize an image.

#### Request payload

```json
{
    "image": "Base64 image with or without MIME type."
}
```

#### Response payload
```json
{
    "output": {
        "image": "Base64 JPEG image with 600px width and MIME data:image/jpg;base64"
    }
}
```