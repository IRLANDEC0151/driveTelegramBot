import Route from '../models/route.js'
import User from '../models/user.js';

export default async function createRoute(userId,routeName) {
    const candidate = await User.findById(userId);
    const route = new Route({
        name: routeName
    })
    try {   
        route.userId = userId
        await route.save()
        candidate.routes.push(route);
        await candidate.save();
        console.log('маршрут создан');
    } catch (error) {
        console.log(error);
    }

}