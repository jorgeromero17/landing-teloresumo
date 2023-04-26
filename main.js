const urlChannel = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCw7Bz6EHxlnOoBUBlJZCWCw&part=snippet%2Cid&order=date&maxResults=12';

const content = null || document.getElementById('content');
const modal = document.getElementById('myModal');
const contentModal = document.getElementById('contentModal');
const iframe = document.getElementById('iframe');
const statistics = document.getElementsByClassName('statistics');
const span = document.getElementsByClassName('close')[0];

const options = {
	method: 'GET',
	headers: {
        'content-type': 'application/octet-stream',
		'X-RapidAPI-Key': 'e068330a82mshe0afe8e34338357p1ac78ejsncfb3f22fa1d0',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

span.onclick = function() {
    modal.style.display = "none";
    document.body.classList.remove('overflow-y-hidden');
    iframe.removeAttribute('src');
}


function openModal(id){       
    try {
        iframe.setAttribute('src', `https://www.youtube.com/embed/${id}`);
        modal.style.display = "flex";
        document.body.classList.add('overflow-y-hidden');
    } catch (error) {
        console.log(error);
    }
}

async function fetchData(urlApi){
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const videos = await fetchData(urlChannel);
        let view = `
        ${videos.items.map(video => `
            <div class="group relative cursor-pointer" onclick="openModal('${video.id.videoId}')">
                <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div>
        `).join('')} 
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();
