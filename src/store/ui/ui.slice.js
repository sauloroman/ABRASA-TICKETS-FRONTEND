import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoading: false,
        alert: {
            isAlertOpen: false,
            contentAlert: '',
            type: 'success',
            link: {
                isLink: false,
                path: '',
            }
        },
        slide: {
            isOpen: true,
        },
        modal: {
            profilePageModal: {
                isOpen: false,
                selectedModal: '',
                data: '',
            },
            eventsPageModal: {
                isOpen: false,
                selectedModal: '',
                data: '',
            },
            eventPageModal: {
                isOpen: false,
                selectedModal: '',
                data: '',
            },
            confirmModal: {
                isOpen: false,
                selectedModal: '',
                data: ''
            }
        }
    },
    reducers: {

        setIsLoading: ( state, { payload }) => {
            state.isLoading = payload;
        },

        setAlert: ( state, { payload } ) => {
            state.alert = payload;
        },

        setOpenModal: ( state, { payload }) => {
            const { modalName, selectedModal, data } = payload;

            state.modal[ modalName ].isOpen = true;
            state.modal[ modalName ].selectedModal = selectedModal;
            state.modal[ modalName ].data = data;
        },
        
        setCloseModal: ( state, { payload }) => {
            const { modalName } = payload;

            state.modal[ modalName ].isOpen = false;
            state.modal[ modalName ].selectedModal = '';
            state.modal[ modalName ].data = '';
        },

        setSlide: ( state, { payload } ) => {
            state.slide = {
                isOpen: payload
            }
        }

    }
})

export const { 
    setIsLoading,
    setAlert,
    setOpenModal,
    setCloseModal,
    setSlide,
} = uiSlice.actions;
