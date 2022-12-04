## Installation

```
npm i -g upload-image-from-clipboard
```

## Set SM.MS token

1. Open https://sm.ms/home/apitoken

![get-token](./screenshot/img.png)

2. Set token to local

```shell
ui -t <your_token>
```

3. Remove token

```shell
rm ~/.config/upload-image.json
```

## Usage

## Via Command line

```
ui
```

## Via JavaScript

```javascript
import { uploadImage } from './dist/index.mjs'

uploadImage()
```
