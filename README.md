# **URL-to-PDF Converter**

### Chrome Extension + Node.js Puppeteer PDF Generator

This project allows you to convert any webpage into a downloadable **PDF** using:

* a Node.js backend with **Puppeteer**
* a Chrome Extension frontend
* PDF download support for:

  * **Current active tab**
  * **Custom URL**

---

## 🚀 Features

* Convert current webpage to PDF
* Convert any custom URL to PDF
* Auto PDF download
* Uses Puppeteer (headless Chrome)
* Preserves layout + background
* Runs locally

---

## 📌 How It Works

1. The Chrome extension sends a webpage URL to the server.
2. Server launches Puppeteer (headless browser).
3. Puppeteer visits the page & prints a PDF.
4. Server responds with PDF binary data.
5. Extension downloads the PDF.

---

## 📁 Project Structure

```
server/
   index.js

extension/
   popup.js
   popup.html
   manifest.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

```bash
npm install express puppeteer
```

---

### 2️⃣ Run Backend Server

```bash
node index.js
```

Server starts at:

```
http://localhost:9090
```

---

### 3️⃣ Setup Chrome Extension

1. Open `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the `extension/` folder
5. Extension icon will appear in the toolbar

---

## 🧪 Usage

### Convert Current Browser Tab

* Open webpage
* Click extension
* Select **Current Page**
* Press Convert
* PDF downloads

### Convert Custom URL

* Select **Custom URL**
* Enter website address
* Press Convert

---

## 🖥 Backend Code (server/index.js)

```js
const express = require("express");
const puppeteer = require("puppeteer");
```

(…your full server code…)

---

## 🔌 API Endpoint

### `POST /convert`

**Request Body:**

```json
{
  "url": "https://google.com"
}
```

**Response:**

`application/pdf` file download

---

## 🔒 CORS Enabled

Server allows requests from anywhere:

```js
Access-Control-Allow-Origin: *
```

---

## ⚡ Technologies

* Node.js
* Express
* Puppeteer
* Chrome Extensions API
* Fetch API

---

## ⚠️ Notes

* Dark themed websites may change PDF background due to print CSS rules.
* PDF output is vector text, not screenshot pixels.
* Requires Chrome installed on the machine.

