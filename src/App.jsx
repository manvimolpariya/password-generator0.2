import { useState,useCallback,useEffect,useRef} from 'react'
import './App.css'
function App() {
 const [length ,setLength] = useState(8);
 const [numberAllowed ,setNumberAllowed] =useState(false); 
 const [charAllowed,setCharAllowed] =useState(false);
 const [Password,setPassword] =useState("");

const passwordRef =useRef(null);
  const PasswordGenerator =useCallback(()=>{
    let pass="";
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numberAllowed) str +="0123456789";
    if(charAllowed)  str+="@#$*_";
    for(let i=1;i<length;i++){
      let char = Math.floor(Math.random() * str.length +1);
      pass +=str.charAt(char);
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword])
 const copyPassword =useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,28);
  window.navigator.clipboard.writeText(Password);
 },[Password])
useEffect(()=>{
  PasswordGenerator();
},[length,numberAllowed,charAllowed,PasswordGenerator])
  return (
    <>

<div className=' md:max-w-md max-w-xs mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-red-300
 bg-gray-900'>
<h1 className='text-2xl my-3 font-semibold text-center text-white'>Password
  <span className='text-red-300'> Generator</span></h1>
<div className='flex shadow rounded-lg overflow-hidden mb-4 '>
<input 
type="text" value={Password} className='outline-none text-red-500 font-semibold w-full py-1 px-3 '
placeholder='password' readOnly
ref={passwordRef}
/>
<button onClick={copyPassword}
className='outline-none bg-red-300 text-black
 px-3 py-0.5 shrink-0 font-semibold
 hover:bg-gray-500 hover:text-red-300 '>Copy</button>
</div>
<div className='text-m gap-x-2'>
<div className='flex items-center gap-x-1 '>
  <input type="range" min={6} max={28} value={length}
  className='high cursor-pointer w-4/6 border-0 rounded-lg' onChange={(e)=>{setLength(e.target.value)}}/>
  <label className='text-lg'>Length: {length}</label>
</div>
<div className='flex text-xl gap-x-4 py-1'>
<div className='flex item-center gap-x-1 px-2'>
<input type="checkbox" defaultChecked={numberAllowed} id="numberInput"
onChange={()=>{
setNumberAllowed((per) => !per)
}} />
<label>Numbers</label>
</div>
<div className='flex item-center gap-x-1 px-2'>
<input type="checkbox" defaultChecked={charAllowed} id="characterInput"
onChange={()=>{
setCharAllowed((per) => !per)
}} />
<label>Characters</label>
</div>
</div>

</div>
</div>
    </>
  )
}

export default App
