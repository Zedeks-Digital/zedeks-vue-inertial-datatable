export function useStatics(){
    const columnTypes=['text', 'link', 'slot', 'html', 'component']
    const actionTypes=['dropDown' , 'iconButtons' , 'textButtons' , 'rightClickRow' , 'clickRow']
    const actionReturnTypes=['string' , 'object' ]
    return {columnTypes,actionTypes,actionReturnTypes}
}