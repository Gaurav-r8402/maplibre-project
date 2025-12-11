export async function getMapData(){
    const styleData= await fetch("https://tiles.latlong.in/blue_essence.json", {
        cache:"no-store",
    });
    const style=await styleData.json();

    style.sprite="";
    if(style.sources?.openmaptiles){
        delete style.sources.openmaptiles;
    }
    style.layers=style.layers.filter(
        (layer:any) => layer.source !== "openmaptiles"
    );
    const statesRes= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data/india_states.json`);
    const capitalRes= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data/IndiaCapital.json`);

    const states = await statesRes.json();
    const capital= await capitalRes.json();

    return { style, states, capital};
}