// Define Camera Movement object
const Camera_Movement = {
    FORWARD: 0,
    BACKWARD: 1,
    LEFT: 2,
    RIGHT: 3
};

class Camera {
    constructor(position = [0.0, 0.0, 0.0], up = [0.0, 1.0, 0.0], yaw = -90.0, pitch = 0.0) {
        // camera Attributes
        this.Position = position;
        this.Front = [0.0, 0.0, -1.0];
        this.Up = up;
        this.Right = null;
        this.WorldUp = up;
        // euler Angles
        this.Yaw = yaw;
        this.Pitch = pitch;
        // camera options
        this.MovementSpeed = 2.5;
        this.MouseSensitivity = 0.1;
        this.Zoom = 45.0;

        this.updateCameraVectors();
    }

    // Get View Matrix
    getViewMatrix() {
        const center = [
            this.Position[0] + this.Front[0],
            this.Position[1] + this.Front[1],
            this.Position[2] + this.Front[2]
        ];
        return mat4.lookAt(this.Position, center, this.Up);
    }



    
    // Process Keyboard Input
    processKeyboard(direction, deltaTime) {
        const velocity = this.MovementSpeed * deltaTime;
        if (direction === Camera_Movement.FORWARD)
            vec3.add(this.Position, this.Position, vec3.scale(vec3.create(), this.Front, velocity));
        if (direction === Camera_Movement.BACKWARD)
            vec3.sub(this.Position, this.Position, vec3.scale(vec3.create(), this.Front, velocity));
        if (direction === Camera_Movement.LEFT)
            vec3.sub(this.Position, this.Position, vec3.scale(vec3.create(), this.Right, velocity));
        if (direction === Camera_Movement.RIGHT)
            vec3.add(this.Position, this.Position, vec3.scale(vec3.create(), this.Right, velocity));
    }

    // Process Mouse Movement
    processMouseMovement(xoffset, yoffset, constrainPitch = true) {
        xoffset *= this.MouseSensitivity;
        yoffset *= this.MouseSensitivity;

        this.Yaw += xoffset;
        this.Pitch += yoffset;

        if (constrainPitch) {
            if (this.Pitch > 89.0)
                this.Pitch = 89.0;
            if (this.Pitch < -89.0)
                this.Pitch = -89.0;
        }

        this.updateCameraVectors();
    }

    // Process Mouse Scroll
    processMouseScroll(yoffset) {
        this.Zoom -= yoffset;
        if (this.Zoom < 1.0)
            this.Zoom = 1.0;
        if (this.Zoom > 45.0)
            this.Zoom = 45.0;
    }

    // Calculate Front, Right, and Up vectors
    updateCameraVectors() {
        const front = [
            Math.cos(glMatrix.toRadian(this.Yaw)) * Math.cos(glMatrix.toRadian(this.Pitch)),
            Math.sin(glMatrix.toRadian(this.Pitch)),
            Math.sin(glMatrix.toRadian(this.Yaw)) * Math.cos(glMatrix.toRadian(this.Pitch))
        ];
        this.Front = vec3.normalize(this.Front, front);
        this.Right = vec3.normalize(this.Right || vec3.create(), vec3.cross(vec3.create(), this.Front, this.WorldUp));
        this.Up = vec3.normalize(this.Up, vec3.cross(vec3.create(), this.Right, this.Front));
    }
}
