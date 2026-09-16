import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
    try {

        const users = await User.find();
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users
        });

    } catch (error) {
        next(error);
    }
}
    
export const getUser = async (req, res, next) => {
    try {

        const users = await User.findById(req.params.id).select('-password');

        if (!users) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: users
        });

    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {

        if (req.user.id !== req.params.id) {
            const error = new Error('You are not authorized to update this user');
            error.statusCode = 403;
            throw error;
        }

        const updates = { ...req.body };
        delete updates.password;

        const user = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        }).select('-password');

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user
        });

    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {

        if (req.user.id !== req.params.id) {
            const error = new Error('You are not authorized to delete this user');
            error.statusCode = 403;
            throw error;
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });

    } catch (error) {
        next(error);
    }
}
