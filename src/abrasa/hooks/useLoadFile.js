import { useRef, useState } from "react";

export const useLoadFile = ( validExtentions = [] ) => {

  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const inputFileRef = useRef();
  const imageRef = useRef();
  const errorMessageRef = useRef();
  const buttonSelectImageRef = useRef();
  const buttonDeleteImageRef = useRef();
  const buttonUpdateImageRef = useRef();

  const onClickInput = (e) => {
    e.preventDefault();
    inputFileRef.current.click();
  };

  const onCancelFile = (e) => {
    e.preventDefault();
    setImageUrl('');
    setFile('');
    imageRef.current.classList.toggle('hide-element');
    buttonSelectImageRef.current.classList.toggle('hide-element');
    buttonDeleteImageRef.current.classList.toggle('hide-element');
    buttonUpdateImageRef.current.classList.toggle('hide-element');
  };

  const onInputFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFile(file);

    if (file.size > 1e6 || !validExtentions.includes(file.type.split('/')[1])) {
      setErrorMessage('El archivo es muy grande o no es formato válido');
      imageRef.current.classList.add('hide-element');
      errorMessageRef.current.classList.remove('hide-element');
    } else {
      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl);
      
      errorMessageRef.current.classList.add('hide-element');
      imageRef.current.classList.toggle('hide-element');
      buttonSelectImageRef.current.classList.toggle('hide-element');
      buttonDeleteImageRef.current.classList.toggle('hide-element');
      buttonUpdateImageRef.current.classList.toggle('hide-element');
    }

  };

  return {
    imageRef,
    imageUrl,
    errorMessage,
    errorMessageRef,
    onInputFileChange,
    inputFileRef,
    buttonDeleteImageRef,
    buttonSelectImageRef,
    onClickInput,
    onCancelFile,
    buttonUpdateImageRef,
    file,
  }
}