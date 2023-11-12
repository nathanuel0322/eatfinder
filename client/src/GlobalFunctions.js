import toast from 'react-hot-toast';

function toastSuccess(message) {
    toast.success(message, {
        position: 'top-center',
        style: {
            background: '#61d345',
            color: '#fff',
        },
        iconTheme: {
            primary: '#fff',
            secondary: '#61d345',
        },
    })
}

function toastError(message) {
    toast.error(message, {
      position: 'top-center',
      style: {
        background: '#ff4b4b',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#ff4b4b',
      },
    })
}

export { toastSuccess, toastError };