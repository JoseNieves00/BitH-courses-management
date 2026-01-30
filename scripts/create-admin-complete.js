import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { config } from 'dotenv';

config({ path: '.env.local' });

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Datos del usuario administrador
const adminUser = {
  nombre: "admin",
  email: "admin@admin.com",
  rol: "admin",
  requiereCambioPassword: false
};

const adminPassword = "admin123";

async function createCompleteAdmin() {
  try {
    console.log('🔥 Creando/actualizando usuario administrador completo...');
    
    let userRecord;
    let userUid;
    
    try {
      // Intentar crear el usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        adminUser.email, 
        adminPassword
      );
      userRecord = userCredential.user;
      userUid = userRecord.uid;
      console.log(`✅ Usuario creado en Firebase Auth: ${userUid}`);
      
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('👤 Usuario ya existe en Firebase Auth, obteniendo UID...');
        
        // Intentar iniciar sesión para obtener el UID
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth, 
            adminUser.email, 
            adminPassword
          );
          userRecord = userCredential.user;
          userUid = userRecord.uid;
          console.log(`✅ Sesión iniciada, UID: ${userUid}`);
          
        } catch (signInError) {
          console.log('⚠️  Contraseña actual incorrecta, intentando con contraseña común...');
          
          // Intentar con contraseñas comunes
          const commonPasswords = ['admin', '123456', 'password', 'Admin123'];
          
          for (const pwd of commonPasswords) {
            try {
              const userCredential = await signInWithEmailAndPassword(
                auth, 
                adminUser.email, 
                pwd
              );
              userRecord = userCredential.user;
              userUid = userRecord.uid;
              console.log(`✅ Sesión iniciada con contraseña "${pwd}", UID: ${userUid}`);
              
              // Actualizar a la contraseña deseada
              await updatePassword(userRecord, adminPassword);
              console.log('🔑 Contraseña actualizada a "admin123"');
              break;
              
            } catch (pwdError) {
              continue;
            }
          }
          
          if (!userRecord) {
            throw new Error('No se pudo iniciar sesión con ninguna contraseña común');
          }
        }
      } else {
        throw error;
      }
    }
    
    // Crear/actualizar datos en Firestore
    const userRef = doc(db, 'usuarios', userUid);
    const userDoc = await getDoc(userRef);
    
    const userData = {
      ...adminUser,
      uid: userUid,
      updatedAt: new Date().toISOString(),
      ...(userDoc.exists ? {} : { createdAt: new Date().toISOString() })
    };
    
    await setDoc(userRef, userData, { merge: true });
    console.log('✅ Datos guardados en Firestore');
    
    console.log('🎉 Usuario administrador configurado exitosamente');
    console.log(`📧 Email: ${adminUser.email}`);
    console.log(`🔑 Contraseña: ${adminPassword}`);
    console.log(`👤 Nombre: ${adminUser.nombre}`);
    console.log(`🔐 Rol: ${adminUser.rol}`);
    console.log(`🆔 UID: ${userUid}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Código:', error.code);
    
    if (error.code === 'permission-denied') {
      console.log('\n💡 Verifica las reglas de Firestore en Firebase Console');
    }
  } finally {
    process.exit(0);
  }
}

createCompleteAdmin();
