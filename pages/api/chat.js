export default async function handler(req, res) {
  try {
    console.log('Received request');
    if (req.method !== "POST") return res.status(405).end();
    const { message, thread_id } = req.body;

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    // 1. Create a thread if not provided
    let threadId = thread_id;
    if (!threadId) {
      const threadRes = await fetch("https://api.openai.com/v1/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "OpenAI-Beta": "assistants=v2"
        }
      });
      const threadData = await threadRes.json();
      console.log('Thread creation response:', threadData);
      threadId = threadData.id;
    }
    console.log('Thread created:', threadId);

    // 2. Add a message to the thread
    await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "OpenAI-Beta": "assistants=v2"
      },
      body: JSON.stringify({
        role: "user",
        content: message
      })
    });
    console.log('Message sent');

    // 3. Run the assistant
    const runRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "OpenAI-Beta": "assistants=v2"
      },
      body: JSON.stringify({
        assistant_id: "asst_npVNinhc30SKKvsih5ZzVhCO"
      })
    });
    const runData = await runRes.json();
    console.log('Run creation response:', runData);
    console.log('Run started:', runData.id);

    // 4. Poll for completion
    let runStatus = runData.status;
    let lastRunData = runData;
    let pollCount = 0;
    while (runStatus !== "completed" && runStatus !== "failed" && runStatus !== "cancelled") {
      pollCount++;
      if (pollCount > 20) throw new Error('Polling timeout');
      await new Promise(r => setTimeout(r, 1500));
      const pollRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runData.id}`, {
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "OpenAI-Beta": "assistants=v2"
        }
      });
      lastRunData = await pollRes.json();
      runStatus = lastRunData.status;
      console.log('Polling run status:', runStatus);
    }

    // 5. Get the latest message from the thread
    const messagesRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "OpenAI-Beta": "assistants=v2"
      }
    });
    const messagesData = await messagesRes.json();
    const lastMessage = messagesData.data
      .filter(m => m.role === "assistant")
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
    console.log('Got messages');

    res.status(200).json({
      response: lastMessage?.content?.[0]?.text?.value || "No response.",
      thread_id: threadId
    });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ response: 'Error: ' + error.message });
  }
}