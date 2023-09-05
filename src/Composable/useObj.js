export function useObj(){
    const hasKey=(object, key)=>{
        if (!Array.isArray(key)){
            return Object.keys(object).includes(key)
        }
        for (const k of key) {
            if (!Object.keys(object).includes(k)) return false;
        }
        return true
    }
    const length=(object)=>{
        return Object.keys(object).length
    }
    return {hasKey,length}
}