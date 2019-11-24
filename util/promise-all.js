function handlePromise(promiseList) {
    return promiseList.map(promise =>
      promise.then((result) => ({ status: '200', result }), (error) => ({ status: '500', error }))
    )
  }

export function allSettled(promiseList){
    return Promise.all(handlePromise(promiseList));
}