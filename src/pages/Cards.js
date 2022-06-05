import { saveAs } from 'file-saver'


const Cards= ({ desc, imageUrl}) => {
     
    const downloadImage = () => saveAs(imageUrl, 'img.jpg');
    
     return (
        <div className="rounded shadow-lg m-2 p-2">
            <img className="object-center" onDoubleClick={downloadImage} src={imageUrl} alt='image' loading="lazy" />
            <div className="px-6 py-4">
                <div className="font-regular text-xl mb-2">{desc}</div>
            </div>
        </div>
    );
}


export default Cards;