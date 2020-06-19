const btnEl = document.getElementById('createLinkBtn');
const shortLinkInputEl = document.getElementById('shortLinkInput');
const originalLinkInputEl = document.getElementById('originalLinkInput');

const createShortLink = async () => {
  const { value: shortLink } = shortLinkInputEl;
  const { value: originalLink } = originalLinkInputEl;
  try {
    const response = await fetch('http://localhost:3000/link', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        shortLinkHash: shortLink,
        originalUrl: originalLink,
      }),
    });
    if (response.status > 399) {
      throw new Error((await response.json()).message || 'Unexpected error!');
    }
    showSuccessMessage(`http://localhost:3000/link/${shortLink}`);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};
const showSuccessMessage = url => {
  const successTextEl = document.createElement('p');
  const link = document.createElement('a');
  link.href = url;
  link.appendChild(
    document.createTextNode(url),
  );

  successTextEl.appendChild(
    document.createTextNode('Successfully created ')
  );
  successTextEl.appendChild(link)
  successTextEl.appendChild(
    document.createTextNode(' url!'),
  );
  
  document.body.appendChild(successTextEl);
};
btnEl.addEventListener('click', createShortLink);