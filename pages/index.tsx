import React, {useCallback, useEffect, useRef, useState} from 'react';
import Head from 'next/head';
import useSyncScroll from 'react-use-sync-scroll';
import Caretaker from '../libs/UndoManager/CareTaker';
import {getMarkdown, basicCommand, getSelectText, inputCommand, startLineCommand} from '../libs/Utilty';
import {actionT, keyMapT, modalT} from '../libs/Types';
import Editor from '../components/Editor';
import Modal from '../components/modal';
import Header from '../components/Header';
import PanelContorl from '../components/PanelContorl';
import ToolBar from '../components/ToolBar';
import Footer from '../components/Footer';
import Markdown from '../components/Markdown';
import HotKeys from '../components/HotKeys';

const careTaker = new Caretaker();

const MarkdownSimpleEditor: React.FC = () => {
  const [editorText, setEditorText] = useState<string>('');
  const [isExpend, setIsExpend] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [isLock, setIsLock] = useState<boolean>(true);
  const [modal, setModal] = useState<modalT>({isOpen: false, action: ''});
  const [fileName, setFileName] = useState<string>('Welcome');

  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const fileNameRef = useRef<HTMLInputElement | null>(null);
  const openFileRef = useRef<HTMLInputElement | null>(null);
  const scrollRefs = useRef<React.MutableRefObject<HTMLTextAreaElement | HTMLDivElement | null>[]>([editorRef, previewRef]);

  // Initial State & Events
  useEffect(() => {
    setEditorText(getMarkdown('welcome'));
    setIsMobile(window.innerWidth < 769);
    setIsExpend(isMobile ? 0 : 1);
    window.addEventListener('resize', updateIsMobile);
    return () => {
      window.removeEventListener('resize', updateIsMobile);
    };
  }, []);

  // Undo Redo
  let isTextRestoring: boolean = false;

  useEffect(() => {
    if (!isTextRestoring) careTaker.set(editorText);
  }, [editorText]);

  const undo = useCallback(() => {
    isTextRestoring = true;
    setEditorText(careTaker.undo());
    isTextRestoring = false;
  }, []);

  const redo = useCallback(() => {
    isTextRestoring = true;
    setEditorText(careTaker.redo());
    isTextRestoring = false;
  }, []);

  const reset = useCallback(() => {
    isTextRestoring = true;
    setEditorText('');
    isTextRestoring = false;
  }, []);

  // Check If Is Mobile
  const updateIsMobile = useCallback(() => setIsMobile(window.innerWidth < 769), []);

  //Sync Scroll
  useSyncScroll(scrollRefs, {vertical: isLock});
  const toggleScroll = useCallback(() => setIsLock((prev) => !prev), []);

  // Panel Control
  const expendClass: string[] = ['app--collapse', '', 'app--expend'];
  const expend = useCallback(() => setIsExpend((prev) => (isMobile || prev >= 1 ? 2 : 1)), [isMobile]);
  const collapse = useCallback(() => setIsExpend((prev) => (isMobile || prev <= 1 ? 0 : 1)), [isMobile]);

  useEffect(() => {
    if (isMobile && isExpend === 1) setIsExpend(0);
  }, [isMobile]);

  // Help Modal
  const openHelp = useCallback(() => setModal({isOpen: true, action: 'help'}), []);

  // Handel Clicks
  const handelClick = useCallback((action: actionT) => {
    const select = getSelectText(editorRef.current);
    if (action.match(/^[bius]$|mark|sup|sub|code/)) useEditText(basicCommand(action, select));
    if (action.match(/[uo]l|line|task|quote|h[1-6]/)) useEditText(startLineCommand(action, select, editorRef.current.value));
    if (action.match(/link|img|^table$/)) setModal({isOpen: true, action});
    if (action.match(/^tab$/)) useEditText(inputCommand(action, select));
  }, []);

  // Edit Text
  const useEditText = useCallback(({start = 0, text = '', end = start, startSelect = start, endSelect = end, offset = 0}) => {
    setEditorText(editorRef.current.value.substring(0, start) + text + editorRef.current.value.substring(end));
    editorRef.current.focus();
    editorRef.current.setSelectionRange(startSelect + offset, endSelect + offset);
  }, []);

  // New File
  const newFile = useCallback(() => {
    reset();
    setEditorText('');
    setFileName('New File');
    setEditorText('');
  }, []);

  // Open File
  const openFile = useCallback(() => openFileRef.current.click(), []);
  const getFile = useCallback(async () => {
    try {
      const file = await openFileRef.current.files[0];
      setEditorText(await file.text());
      setFileName(await file.name.replace(/\.\w+/, ''));
    } catch (error) {
      console.log(error);
    }
    openFileRef.current.value = '';
  }, []);

  // Save File
  const saveFile = useCallback(() => {
    const element = document.createElement('a');
    const file = new Blob([editorRef.current.value], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = (fileName || 'untitled') + '.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, []);

  // Keyboard Hotkeys
  const globalKeyMap = useRef<keyMapT>([
    {name: 'NEW_FILE', altKey: true, key: 'n', callback: newFile},
    {name: 'OPEN_FILE', ctrlKey: true, key: 'o', callback: openFile},
    {name: 'SAVE_FILE', ctrlKey: true, key: 's', callback: saveFile},
    {name: 'UNDO', ctrlKey: true, key: 'z', callback: undo},
    {name: 'REDO', ctrlKey: true, key: 'y', callback: redo},
    {name: 'REDO', ctrlKey: true, shiftKey: true, key: 'z', callback: redo},
    {name: 'EXPEND', ctrlKey: true, shiftKey: true, key: 'e', callback: expend},
    {name: 'COLLAPSE', ctrlKey: true, altKey: true, key: 'e', callback: collapse},
    {name: 'SCROLL_SYNC', ctrlKey: true, altKey: true, shiftKey: true, key: 's', callback: toggleScroll},
    {name: 'HELP', key: 'f1', callback: openHelp},
  ]);

  return (
    <HotKeys keyMap={globalKeyMap.current}>
      <div className={'app ' + expendClass[isExpend]}>
        <Head>
          <title>Simple Markdown Editor</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta http-equiv='X-UA-Compatible' content='ie=edge' />
        </Head>
        <Header
          ref={fileNameRef}
          fileName={fileName}
          setFileName={setFileName}
          newFile={newFile}
          openFile={openFile}
          saveFile={saveFile}
          openHelp={openHelp}
          isMobile={isMobile}
          undo={undo}
          redo={redo}
        />
        <div className='panel editor'>
          <ToolBar useClick={handelClick} />
          <Editor editorText={editorText} setEditorText={setEditorText} ref={editorRef} handelClick={handelClick} />
        </div>
        <div className='panel preview'>
          <PanelContorl expend={expend} collapse={collapse} isLock={isLock} toggleScroll={toggleScroll} />
          <Markdown className='preview__markdown' id='preview' sourceText={editorText} ref={previewRef} />
        </div>
        <Footer show={isMobile} />
        {modal.isOpen && <Modal action={modal.action} setModal={setModal} editorRef={editorRef} useEditText={useEditText} />}
        <input ref={openFileRef} className='hide' type='file' accept='.md, .markdown' onChange={getFile} />
      </div>
    </HotKeys>
  );
};
export default React.memo(MarkdownSimpleEditor);
