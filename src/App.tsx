import React, { Suspense, useEffect, useState } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { routes } from '../src/routes/index'
import { useSelector } from 'react-redux'
import type { RootState } from './store';

function App() {
  // 从redux中获取cookie
  let cookie = useSelector((state: RootState) => state.cookie.value)

  // 根据是否有cookie来动态路由
  function getroutes(routes: RouteObject[]): RouteObject[] {
    if (!cookie) {
      return routes.filter((item) => {
        return item.path?.includes('/login') || item.path === '/'
      })
    } else {
      return routes
    }
  }
  let [elements, setElements] = useState<RouteObject[]>(getroutes(routes))

  const route = useRoutes(elements)

  // eslint-disable-next-line 
  useEffect(() => {
    // eslint-disable-next-line 
    setElements(getroutes(routes))
    // eslint-disable-next-line 
  }, [cookie])
  return (
    <div className="bg-green-100 w-screen h-screen flex flex-center">
      <div className=" w-240  h-192 bg-white m-auto flex flex-center">
        <Suspense>
          {route}
        </Suspense>
      </div>
    </div>
  );
}

export default App;


