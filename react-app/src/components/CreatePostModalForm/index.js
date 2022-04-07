import { useState, useEffect } from 'react';
import postsReducer from '../../store/posts';
import "./index.css";
import { createPost } from '../../store/posts';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Modal } from "../../context/modal"

function CreatePostModalForm() {
    const [photos, setPhotos] = useState([])
    const [photoIndex, setPhotoIndex] = useState(0)
    const [photoExist, setPhotoExist] = useState(false)
    const [showMorePhotos, setShowMorePhotos] = useState(false)
    const [photoFinished, setPhotoFinished] = useState(false)
    const [caption, setCaption] = useState('')
    const [showConfirmBack, setShowConfirmBack] = useState(false)
    const dispatch = useDispatch();


    const user = useSelector(state => {
        return state.session.user
    })

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
        if (showMorePhotos) {
            setShowMorePhotos(false)
        }
        else {
            setShowMorePhotos(true);
        }

    }
    // console.log('why',showMorePhotos)


    useEffect(() => {
        if (!showMorePhotos) return;
        let ignore1 = document.querySelector('.add-more-photos-button')
        let ignore2 = document.querySelector('#add-more-photos-button')
        let ignore3 = document.querySelector('#goForward')

        let ignore4 = document.querySelector('#goBackward')

        const closeShowMore = (event) => {
            let target = event.target
            if (target === ignore1 || ignore1.contains(target) || target === ignore2 || ignore2.contains(target)) {
                return;
            } else if (ignore3 && (target === ignore3 || ignore3.contains(target))) {
                return;
            } else if (ignore4 && (target === ignore4 || ignore4.contains(target))) {
                return
            }
            setShowMorePhotos(false)
        }

        const modal = document.querySelector(".create-post-form-container")
        modal.addEventListener('click', closeShowMore)

        return () => modal.removeEventListener("click", closeShowMore);

    }, [showMorePhotos, photos])
    useEffect(() => {
        // console.log('these are my photos', photos)
        let imageCollect = document.querySelectorAll(".photo-preview-container > img")
        imageCollect.forEach(ele => {
            ele.addEventListener("dragstart", handleDragStart);
            ele.addEventListener('dragend', handleDragEnd);

            // ele.addEventListener('dragenter', handleDragOver);
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
            e.stopPropagation() // stops the browser from redirecting.
            let dragImage = e.dataTransfer.getData('text/uri-list')
            // console.log('start of photos', photos)
            // console.log('what is the drag', dragImage)
            // console.log('how many times are you running per move')
            // console.log('what is the drop', e.target.src)
            let dragIndex = parseInt(e.dataTransfer.getData('text/plain').split("-")[2])
            let dropIndex = parseInt(e.target.className.split("-")[2])
            let dragSwitch = photos[dragIndex]
            let dropSwitch = photos[dropIndex]
            let photosCopy = [...photos]
            // console.log('indexes', dropIndex, typeof dropIndex)
            let tmpDrag = photosCopy[dragIndex]
            photosCopy[dragIndex] = photosCopy[dropIndex]
            photosCopy[dropIndex] = tmpDrag
            // photosCopy.splice(parseInt(dragIndex), 1, dropSwitch)
            // photosCopy.splice(parseInt(dropIndex), 1, dragSwitch)
            // console.log('what are my photos', photos, photosCopy)
            setPhotoIndex(dropIndex)
            // let dragImageClassName = e.dataTransfer.getData('text/plain')
            // console.log('dragclass',dragImageClassName)

            // let dropImage = e.target.src
            // let dropImageClassName = e.target.className

            // console.log('dropclass', dropImageClassName)

            // e.target.src = URL.createObjectURL(dragSwitch)

            // console.log('before', e.target.className)
            // e.target.className = dragImageClassName
            // console.log('wtf',typeof dragImageClassName, dragImageClassName)
            // console.log('after', e.target.className)

            // console.log('differences', dropImage, dragImage)
            // let oldImg = document.querySelector(`.${e.dataTransfer.getData('text/plain')}`)
            // console.log('what is the old image', oldImg)
            // oldImg.src = URL.createObjectURL(dropSwitch)
            // oldImg.className = dropImageClassName
            // console.log('target clas', e.target.className, e.target.src)

            // if (dragSrcEl !== e.target) {
            //     dragSrcEl.innerHTML = e.target.innerHTML;
            //     e.target.innerHTML = e.dataTransfer.getData('text/html');
            // }

            setPhotos([...photosCopy])

            return false;
        }
        return (function () {
            imageCollect.forEach(ele => {
                ele.removeEventListener("dragstart", handleDragStart);
                ele.removeEventListener('dragend', handleDragEnd);
                ele.removeEventListener('dragover', handleDragOver);
                ele.removeEventListener('drop', handleTheDrop);
            })
        })
    }, [photos, showMorePhotos])

    const closeModals = () => {
        setPhotoExist(false)
        setShowConfirmBack(false)
        setPhotos([])
    }

    function firstBackButton() {
        setShowConfirmBack(true)
    }

    function deletePhoto(index) {
        console.log('what is i', index)
        console.log('what is photos', photos)
        let photoCopy = [...photos]
        console.log('what is photocopy', photoCopy[1], photoCopy)
        photoCopy.splice(index, 1)
        let oldIndex = photoIndex
        if (oldIndex > 0) {
            oldIndex = photoIndex - 1;
        } else {
            oldIndex = 0;
        }

        setPhotoIndex(oldIndex)
        setPhotos([...photoCopy])
    }

    function goForward() {
        let oldI = photoIndex
        oldI += 1
        setPhotoIndex(oldI)
    }
    function goBack() {
        let oldI = photoIndex
        oldI -= 1
        setPhotoIndex(oldI)
    }
    function secondBackButton() {
        setPhotoFinished(false)
    }

    return (
        <div className='create-post-form-container'>


            {photoFinished &&
                <div className='adding-caption-container'>
                    <div className='top-adding-caption-nav'>
                        <div className='adding-caption-back-button'>
                            <button type='button' id='second-back-button' onClick={secondBackButton}>
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                        </div>
                        <div >
                            Create New Post
                        </div>
                        <div>
                            <button type='button' id='share-button' onClick={handlePostSubmit}>
                                Share
                            </button>
                        </div>
                    </div>
                    <div className='finished-photos-bottom-container'>

                        <img src={URL.createObjectURL(photos[0])}></img>

                        <div className='captions-adding-form'>
                            <div className='create-post-user'>
                                <div className='create-post-user-picture'>
                                    <img src={user.profile_image}></img>
                                </div>
                                <div className='create-post-username'>
                                    {user.username}
                                </div>
                            </div>
                            <div className='create-post-comment-input'>
                                <input
                                    type='textarea'
                                    id='add-a-caption-input'
                                    rows='20'
                                    columns='30'
                                    value={caption}
                                    onChange={updateCaption}>
                                </input>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {photoExist && !photoFinished &&
                <div className='photo-exists-modal'>
                    <div className='top-photos-nav'>
                        <div className='photos-back-button'>
                            <button type='button' id='firstBackButton' onClick={firstBackButton}>
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                            {showConfirmBack &&

                                <Modal onClose={() => setShowConfirmBack(false)}>
                                    <div className="close-modal-confirm">
                                        <div className="close-confirm-top">
                                            <div className='discardPostDiv'>
                                                Discard post?
                                            </div>
                                            <div className='ifLeaveDiv'>
                                                If you leave, your edits won't be saved.
                                            </div>
                                        </div>
                                        <div className="close-confirm-buttons">
                                            <button id='discardButton' type='button' onClick={closeModals}>
                                                Discard
                                            </button>
                                            <button id='cancelDiscardButton' type='button' onClick={() => setShowConfirmBack(false)}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </Modal>
                            }
                        </div>
                        <div className='one-photo-title'>
                            Your photos
                        </div>
                        <div className='next-photos-button'>
                            <button id='firstNextButton' type='button' onClick={() => setPhotoFinished(true)}>
                                Next
                            </button>
                        </div>
                    </div>
                    <div id='photo-wrapper'>
                        {console.log('gotcha', photos, photoIndex)}
                        <img id='displayed-photo' src={URL.createObjectURL(photos[photoIndex])}></img>

                        {photoIndex < photos.length - 1 &&
                            <button id='goForward' onClick={goForward}>
                                <i className="fa-solid fa-angle-right"></i>
                            </button>
                        }

                        {photoIndex !== 0 &&
                            <button id='goBackward' onClick={goBack}>
                                <i className="fa-solid fa-angle-left"></i>
                            </button>
                        }

                        <button id='add-more-photos-button' type='button' onClick={openShowMore}>
                            <i className="fa-solid fa-images"></i>
                        </button>
                        {showMorePhotos &&
                            <div className='add-more-photos-button'>
                                <div className='photo-preview-container'>

                                    {photos.map((ele, i) => {
                                        console.log('delete bug', ele, i)
                                        return (
                                            <>
                                                {photos.length > 1 &&
                                                    <button key={ele.name} type="button" id='delete-photo-button' onClick={() => deletePhoto(i)}>
                                                        <i className="fa-solid fa-circle-xmark"></i>
                                                    </button>}
                                                <img onClick={() => setPhotoIndex(i)} draggable='true' key={i} className={`draggable-image-${i}`} src={URL.createObjectURL(ele)}></img>
                                            </>

                                        )
                                    })}


                                </div>
                                <label id='add-more-photos-label' htmlFor='add-more-photos'><i class="fa-solid fa-circle-plus"></i></label>
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
