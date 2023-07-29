export const errorHandler = async(err) => {
    if(process.env.NODE_ENV !== 'production'){
        console.log(err);
    }
}