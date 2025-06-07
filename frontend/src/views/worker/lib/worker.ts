addEventListener("message", ({data}) => {
  const processedData = crazyExpensiveImgFilter(data);
  console.log(processedData)
  postMessage(processedData, [processedData.data.buffer])
})

function crazyExpensiveImgFilter(imageData: ImageData) {
  const { data, width, height } = imageData;

  // Первоначальный цветовой сдвиг
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;

      const red = data[index];
      const green = data[index + 1];
      const blue = data[index + 2];

      // Изменение цвета с тяжелыми вычислениями
      const newRed = (red + 100 + Math.sin(x) * 10 + Math.log1p(y)) % 256;
      const newGreen = (green + 50 + Math.cos(y) * 10 + Math.exp(x / 100)) % 256;
      const newBlue = (blue + 150 + Math.tan((x + y) / 100) + Math.sqrt(x + y)) % 256;

      data[index] = newRed;
      data[index + 1] = newGreen;
      data[index + 2] = newBlue;
    }
  }

  // Размытие с высоким уровнем затрат на вычисления
  const tempImageData = new Uint8ClampedArray(data);
  const kernel = [1, 2, 1, 2, 4, 2, 1, 2, 1]; // Гауссовское размытие
  const kernelSize = 3;

  for (let iteration = 0; iteration < 20; iteration++) {
    for (let y = kernelSize; y < height - kernelSize; y++) {
      for (let x = kernelSize; x < width - kernelSize; x++) {
        const index = (y * width + x) * 4;

        let rSum = 0;
        let gSum = 0;
        let bSum = 0;

        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const kernelIndex = (ky + 1) * kernelSize + kx + 1;
            const pixelIndex = ((y + ky) * width + (x + kx)) * 4;

            rSum += tempImageData[pixelIndex] * kernel[kernelIndex];
            gSum += tempImageData[pixelIndex + 1] * kernel[kernelIndex];
            bSum += tempImageData[pixelIndex + 2] * kernel[kernelIndex];
          }
        }

        data[index] = rSum / 16;
        data[index + 1] = gSum / 16;
        data[index + 2] = bSum / 16;
      }
    }
  }

  // Увеличение затрат на вычисления путем дополнительного глубокого цикла
  const dummyArray = new Float64Array(1000000); // Создание большого массива
  for (let i = 0; i < dummyArray.length; i++) {
    dummyArray[i] = Math.random();
  }

  for (let i = 0; i < 1000; i++) { // Вложенный цикл
    for (let j = 0; j < 1000; j++) {
      for (let k = 0; k < 10; k++) {
        // Сложные неэффективные вычисления
        const value = Math.sin(dummyArray[i % dummyArray.length] + j) *
          Math.cos(dummyArray[j % dummyArray.length] + k);
      }
    }
  }

  // Добавление еще одной дорогостоящей операции
  for (let i = 0; i < 1000000; i++) {
    Math.sqrt(i) * Math.log(i + 1);
  }

  return imageData;
}
