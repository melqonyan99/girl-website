const join = require("path").join;

async function generateQRCode() {
  const QRCode = await require("qrcode");

  const url = "https://www.aleksany.com";
  const outputPath = join(process.cwd(), "public", "aleksany-qr-code.png");

  try {
    // Generate QR code with high error correction and large size
    await QRCode.toFile(outputPath, url, {
      errorCorrectionLevel: "H",
      type: "png",
      quality: 1,
      margin: 2,
      width: 1000,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    console.log("✓ QR Code generated successfully!");
    console.log(`✓ Location: public/aleksany-qr-code.png`);
    console.log(`✓ URL: ${url}`);
    console.log("\nYou can now download this QR code and use it anywhere!");
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
}

generateQRCode();
