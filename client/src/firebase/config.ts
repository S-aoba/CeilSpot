import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyApBoid12r5kz4ptM-qj3Of2IPFsUuRVDA',
  authDomain: 'ceilspot.firebaseapp.com',
  projectId: 'ceilspot',
  storageBucket: 'ceilspot.appspot.com',
  messagingSenderId: '414014550555',
  appId: '1:414014550555:web:b354009959cef997a9bebe',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }
