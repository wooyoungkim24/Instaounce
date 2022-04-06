import { useState, useEffect } from 'react';
import postsReducer from '../../store/posts';
import "./index.css";
import { createPost } from '../../store/posts';
import { useDispatch } from 'react-redux';



function CreatePostModalForm() {
    const [photos, setPhotos] = useState([])
    const [photoIndex, setPhotoIndex] = useState(0)
    const [photoExist, setPhotoExist] = useState(false)
    const [showMorePhotos, setShowMorePhotos] = useState(false)
    const [photoFinished, setPhotoFinished] = useState(false)
    const [caption, setCaption] = useState('')

    const dispatch = useDispatch();


    const updateImageFirst = (e) => {
        const file = e.target.files[0]
        setPhotos([...photos, file])
        setPhotoExist(true)
    }
    const updateImage = (e) => {
        const file = e.target.files[0]
        console.log('where is my file', file)
        setPhotos([...photos, file])
        e.target.value = null;

    }

    const updateCaption = (e) => {
        setCaption(e.target.value)
    }

    const handlePostSubmit = () => {
        let data = new FormData();
        photos.forEach((photo, index) => {
            data.append("file[]", photo)
        })
        data.append("caption", caption)


        dispatch(createPost(data))


    }
    const openShowMore = () => {
        if (showMorePhotos) return;
        setShowMorePhotos(true);
    }
    // console.log('why',showMorePhotos)


    useEffect(() => {
        if (!showMorePhotos) return;
        let ignore = document.querySelector('.add-more-photos-button')

        const closeShowMore = (event) => {
            let target = event.target
            if (target === ignore || ignore.contains(target)) {
                return;
            }
            setShowMorePhotos(false)
        }




        const modal = document.querySelector(".create-post-form-container")
        modal.addEventListener('click', closeShowMore)

        return () => modal.removeEventListener("click", closeShowMore);

    }, [showMorePhotos])
    useEffect(()=>{
        console.log('these are my photos',photos)
        let imageCollect = document.querySelectorAll(".photo-preview-container > img")
        imageCollect.forEach(ele => {
            ele.addEventListener("dragstart", handleDragStart);
            ele.addEventListener('dragend', handleDragEnd);

            // ele.addEventListener('dragenter', handleDragEnter);
            // ele.addEventListener('dragleave', handleDragLeave);
            ele.addEventListener('dragover', handleDragOver)
            ele.addEventListener('drop', handleTheDrop);
        })
        function handleDragStart(e) {
            e.target.style.opacity = '0.4'

            console.log('what is ths source', e.target.className, e.target.src)
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/uri-list', e.target.src);
            e.dataTransfer.setData('text/plain', e.target.className)
            return false;
        }
        function handleDragEnd(e) {
            e.target.style.opacity = '1';
            // imageCollect.forEach(function (item) {
            //     item.classList.remove('over');
            // });
            return false;
        }

        function handleDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move'
            return false;
        }

        // function handleDragEnter(e) {
        //     e.target.classList.add('over');
        // }

        // function handleDragLeave(e) {
        //     e.target.classList.remove('over');
        // }

        function handleTheDrop(e) {
            e.stopImmediatePropagation() // stops the browser from redirecting.
            let dragImage = e.dataTransfer.getData('text/uri-list')
            // console.log('what is the drag', dragImage)
            // console.log('how many times are you running per move')
            // console.log('what is the drop', e.target.src)
            let dragIndex = e.dataTransfer.getData('text/plain').split("-")[2]
            let dropIndex = e.target.className.split("-")[2]
            let dragSwitch = photos[dragIndex]
            let dropSwitch = photos[dropIndex]
            let photosCopy = [...photos]
            photosCopy.splice(dragIndex, 1, dropSwitch)
            photosCopy.splice(dropIndex, 1, dragSwitch)
            console.log('what are my photos', photos, photosCopy)
            // setPhotos(...photosCopy)
            let dragImageClassName = e.dataTransfer.getData('text/plain')
            // console.log('dragclass',dragImageClassName)

            let dropImage = e.target.src
            let dropImageClassName = e.target.className

            // console.log('dropclass', dropImageClassName)

            e.target.src = dragImage

            // console.log('before', e.target.className)
            // e.target.className = dragImageClassName
            console.log('wtf',typeof dragImageClassName, dragImageClassName)
            // console.log('after', e.target.className)

            // console.log('differences', dropImage, dragImage)
            let oldImg = document.querySelector(`.${e.dataTransfer.getData('text/plain')}`)
            // console.log('what is the old image', oldImg)
            oldImg.src = dropImage
            // oldImg.className = dropImageClassName
            // console.log('target clas', e.target.className, e.target.src)

            // if (dragSrcEl !== e.target) {
            //     dragSrcEl.innerHTML = e.target.innerHTML;
            //     e.target.innerHTML = e.dataTransfer.getData('text/html');
            // }

            return false;
        }
    },[photos, showMorePhotos])





    return (
        <div className='create-post-form-container'>


            {photoFinished &&
                <div className='adding-caption-container'>
                    <div className='top-adding-caption-nav'>
                        <div className='adding-caption-back-button'>

                        </div>
                        <div >
                            Create New Post
                        </div>
                        <div>
                            <button type='button' onClick={handlePostSubmit}>
                                Share
                            </button>
                        </div>
                    </div>
                    <div className='finished-photos-bottom-container'>
                        <div>
                            <img src={URL.createObjectURL(photos[0])}></img>
                        </div>
                        <div className='captions-adding-form'>
                            <form>
                                <input
                                    type='textarea'
                                    id='add-a-caption-input'
                                    rows='20'
                                    columns='30'
                                    value={caption}
                                    onChange={updateCaption}>
                                </input>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {photoExist && !photoFinished &&
                <div className='photo-exists-modal'>
                    <div className='top-photos-nav'>
                        <div className='photos-back-button'>

                        </div>
                        <div className='one-photo-title'>
                            Your photos
                        </div>
                        <div className='next-photos-button'>
                            <button type='button' onClick={() => setPhotoFinished(true)}>
                                Next
                            </button>
                        </div>
                    </div>
                    <div id='photo-wrapper'>
                        <img id='displayed-photo' src={URL.createObjectURL(photos[photoIndex])}></img>
                        <button id='add-more-photos-button' type='button' onClick={openShowMore}>
                            Add more photos
                        </button>
                        {showMorePhotos &&
                            <div className='add-more-photos-button'>
                                <div className='photo-preview-container'>
                                    {photos.map((ele, i) => {
                                        return (
                                            <img draggable='true' key={i} className={`draggable-image-${i}`} src={URL.createObjectURL(ele)}></img>
                                        )
                                    })}
                                </div>

                                <input
                                    type='file'
                                    accept='image/*'
                                    id='add-more-photos'
                                    onChange={updateImage}
                                >
                                </input>
                            </div>}
                    </div>

                </div>}
            {!photoExist &&
                <div className='photo-absent-modal'>
                    <div className='no-photos-title'>
                        Create New Post
                    </div>
                    <div className='photo-icon'>
                        <i className="fa-solid fa-photo-film"></i>
                    </div>
                    <div className='add-first-photo-div'>
                        <form>
                            <label id='add-photo-1-label' htmlFor='add-photo-1'>Select from computer</label>
                            <input
                                type='file'
                                required
                                accept='image/*'
                                id='add-photo-1'
                                onChange={updateImageFirst}>
                            </input>
                        </form>
                    </div>
                </div>}
        </div>

    )
}
export default CreatePostModalForm;
