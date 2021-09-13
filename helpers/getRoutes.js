import Route from '../models/route.js'
import User from '../models/user.js';

export default async function getRoutes(userId) {
   const candidate = await User.findById(userId);
   const arr = await candidate.populate("routes")
   const routesNames = arr.routes.map(route => [route.name])
   return routesNames
}        