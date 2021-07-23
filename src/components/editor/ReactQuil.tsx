import React, { useEffect, useRef, useCallback } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { TypeActions } from '../../interfaces/actions.interface';
import { ALERT } from '../../redux/constants/constants';
import { checkImage, imageUpload } from '../../utils/imageUpload';

const container = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction
  [{ align: [] }],
  ['clean', 'link', 'image', 'video'],
];

interface IProps {
  setBody: (value: string) => void;
}

const Quill = ({ setBody }: IProps): JSX.Element => {
  const quillRef = useRef<ReactQuill>(null);
  const dispatch = useDispatch();
  const modules = { toolbar: { container } };

  const handleChangeImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = async () => {
      const { files } = input;
      if (!files)
        return dispatch<TypeActions>({ type: ALERT, payload: { error: 'File does not exist.' } });
      const file = files[0];
      const check = checkImage(file);
      if (check) return dispatch<TypeActions>({ type: ALERT, payload: { error: check } });
      dispatch<TypeActions>({ type: ALERT, payload: { loading: true } });
      const photo = await imageUpload(file);
      const quill = quillRef.current;
      const range = quill?.getEditor().getSelection()?.index;
      if (range !== undefined) {
        quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`);
      }
      return dispatch<TypeActions>({ type: ALERT, payload: { loading: false } });
    };
  }, [dispatch]);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    const toolbar = quill.getEditor().getModule('toolbar');
    toolbar.addHandler('image', handleChangeImage);
  }, [handleChangeImage]);

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Write somethings..."
        onChange={(e) => setBody(e)}
        ref={quillRef}
      />
    </div>
  );
};

export default Quill;
