export const DisplayFileSize = (n:number) =>{
    if(n < 1024) return n + ' bytes'
    n = n/1024 
    if(n < 1024) return n.toFixed(2) + 'KB'
    n = n/1024 
    if(n < 1024) return n.toFixed(2) + 'MB'
    n = n/1024 
    if(n < 1024) return n.toFixed(2) + 'GB'
    n = n/1024 
    if(n < 1024) return n.toFixed(2) + 'TB'
}

export const toBase64 = (file : File, onprogress?: (progress_0_to_1: number)=>any) => new Promise((resolve: (r:string | null)=>any, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => resolve(reader.result as string | null);
    reader.onerror = error => reject(error);
    if(onprogress) {
        reader.onprogress = (ev)=>{
            onprogress(ev.loaded / ev.total)
        }
    }
    
    reader.readAsDataURL(file);
});