export default async function handler(req, res) {
  // فقط اجازه درخواست‌های POST را می‌دهیم
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // کلید را از متغیرهای امن سرور می‌خوانیم (دیگر در کد نیست!)
  const API_KEY = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`;

  try {
    const geminiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY // چسباندن کلید در محیط امن
      },
      body: JSON.stringify(req.body) // دیتایی که از سایت تو آمده
    });

    const data = await geminiResponse.json();
    res.status(geminiResponse.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}