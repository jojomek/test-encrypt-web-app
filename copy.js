function copyOutput() {
    // Replace 'outputElementId' with the actual ID of your output element
    const output = document.getElementById('outputElementId');
    if (output) {
        const text = output.innerText || output.value || '';
        navigator.clipboard.writeText(text).then(() => {
            // Optionally, provide feedback to the user
            const btn = document.getElementById('copyButton');
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = 'Copy', 1500);
        });
    }
}