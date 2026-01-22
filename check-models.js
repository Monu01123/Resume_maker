
import { writeFile } from 'fs/promises';

const key = "AIzaSyAQPU43C9hmPMhaBQKrjjyUCD8I4kBTaY4";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

async function check() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.error) {
        console.error("API Error:", data.error);
        await writeFile('gemini_models.txt', `ERROR: ${JSON.stringify(data.error, null, 2)}`);
        return;
    }

    if (!data.models) {
        console.log("No models found or authentication issue.");
        await writeFile('gemini_models.txt', "No models found in response.");
        return;
    }

    const geminiModels = data.models
        .filter(m => m.name.includes('gemini'))
        .map(m => m.name)
        .join('\n');

    console.log("Found models:", geminiModels);
    await writeFile('gemini_models.txt', geminiModels || "No Gemini models found.");
  } catch (e) {
    console.error(e);
    await writeFile('gemini_models.txt', `EXCEPTION: ${e.message}`);
  }
}
check();
