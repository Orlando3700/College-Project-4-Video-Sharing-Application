//implement our updateView. The view organizes the requests
//we are making. It should access the back end API to query
//the data and implement the data.

document.addEventListener('DOMContentLoaded', () => {
  const videoList = document.getElementById('video-list');
  const addVideoForm = document.getElementById('add-video-form');

  // Fetch and display videos
  async function fetchVideos() {
    const response = await fetch('/api/videos');
    const videos = await response.json();
    videoList.innerHTML = '';

    videos.forEach(video => {
      const videoElement = document.createElement('div');
      videoElement.innerHTML = `
        <h3>${video.title}</h3>
        <p>${video.description}</p>
        <iframe width="560" height="315" src="${video.url}" frameborder="0" allowfullscreen></iframe>
      `;
      videoList.appendChild(videoElement);
    });
  }

  // Add video form submission
  addVideoForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const url = document.getElementById('url').value;

    await fetch('/api/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, url }),
    });

    // Clear the form
    addVideoForm.reset();

    // Refresh the video list
    fetchVideos();
  });

  // Initial fetch
  fetchVideos();
});
