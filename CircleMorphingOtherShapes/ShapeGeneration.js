function GenerateShapePoints(Angles, Distance)
{
    let Edges = [];
    for(let i = 0; i < Angles.length; i++)
    {
        Angles[i] = Math.round(Angles[i]);
        let x = Math.cos(radians(Angles[i])) * Distance[i];
        let y = Math.sin(radians(Angles[i])) * Distance[i];
        Edges.push(createVector(x, y));
    }

    let Points = [];
    for(let i = 0; i < 360; i++)
    {
        let index = 0;
        index = Angles.length - 1;
        for(let j = 0; j < Angles.length; j++)
        {
            if(i < Angles[j])
            {
                index = (j - 1 + Angles.length) % Angles.length;
                break;
            }
        }
        let way = ((i - Angles[index] + 360) % 360) / ((Angles[(index + 1) % Angles.length] - Angles[index] + 360) % 360);
        let x = lerp(Edges[index].x, Edges[(index + 1) % Angles.length].x, way);
        let y = lerp(Edges[index].y, Edges[(index + 1) % Angles.length].y, way);
        Points.push(createVector(x, y));
    }
    return Points;
}

function GenerateCirclePoints(Radius)
{
    let Points = [];
	for(let i = 0; i < 360; i++)
	{
		Points.push(createVector(Math.cos(radians(i)) * Radius, Math.sin(radians(i)) * Radius));
    }
    return Points;
}