export async function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result || '');
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export async function readDocxFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const mammoth = await import('https://cdn.jsdelivr.net/npm/mammoth@1.8.0/+esm');
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

export async function readPdfFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfjsLib = await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/+esm');
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.min.js`;

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => item.str)
      .join(' ');
    text += pageText + '\n\n';
  }

  return text.trim();
}

export async function readFileContent(file) {
  const extension = file.name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'txt':
    case 'md':
    case 'markdown':
      return readTextFile(file);
    case 'docx':
      return readDocxFile(file);
    case 'pdf':
      return readPdfFile(file);
    default:
      throw new Error(`Unsupported file type: ${extension}`);
  }
}

export function validateFile(file) {
  const allowedExtensions = ['txt', 'md', 'markdown', 'pdf', 'docx'];
  const maxSize = 10 * 1024 * 1024;

  const extension = file.name.split('.').pop()?.toLowerCase();

  if (!extension || !allowedExtensions.includes(extension)) {
    return { valid: false, error: 'Please upload a TXT, MD, PDF, or DOCX file' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }

  return { valid: true };
}