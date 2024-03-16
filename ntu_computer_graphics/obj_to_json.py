import json

def parse_obj(filename):
    vertex_positions = []
    vertex_normals = []
    vertex_front_colors = []
    vertex_back_colors = []

    with open(filename, 'r') as obj_file:
        for line in obj_file:
            if line.startswith('v '):
                _, x, y, z = line.strip().split()
                vertex_positions.extend([float(x), float(y), float(z)])
            elif line.startswith('vn '):
                _, nx, ny, nz = line.strip().split()
                vertex_normals.extend([float(nx), float(ny), float(nz)])
            elif line.startswith('vcf '):
                _, r, g, b = line.strip().split()
                vertex_front_colors.extend([float(r), float(g), float(b)])
            elif line.startswith('vcb '):
                _, r, g, b = line.strip().split()
                vertex_back_colors.extend([float(r), float(g), float(b)])

    return {
        "vertexPositions": vertex_positions,
        "vertexNormals": vertex_normals,
        "vertexFrontColors": vertex_front_colors,
        "vertexBackColors": vertex_back_colors
    }

def main():
    obj_filename = 'pinkball.obj'
    json_filename = 'pinkball.json'

    data = parse_obj(obj_filename)

    with open(json_filename, 'w') as json_file:
        json.dump(data, json_file, indent=4)

    print(f"Converted OBJ file '{obj_filename}' to JSON file '{json_filename}'.")

if __name__ == "__main__":
    main()
