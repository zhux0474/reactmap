export var metadata ={
    
    1:{attributename:"Total Smoker",
    id:1,
    geojson_url:"https://smartcommunityhealth.ahc.umn.edu/lung_cancer/wms?service=WMS&version=1.1.0&request=GetMap&layers=lung_cancer%3Amn_smoker_total&bbox=-97.239209%2C43.499383499%2C-89.4917389999999%2C49.3843580000001&width=768&height=583&srs=EPSG%3A4326&format=geojson",

    color:['#edf8fb','#bfd3e6','#9ebcda','#8c96c6','#8856a7','#810f7c'],
    //break:[0,200,400,600,800,1000]},
    break:[0,20,40,60,80,100]},

    2:{attributename:"White Smoker",
    id:2,
    geojson_url:"https://smartcommunityhealth.ahc.umn.edu/lung_cancer/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lung_cancer%3Amn_smoker_ethnicity&viewparams=ethnicity:White&propertyName=geo_id,brfss_smoker&outputFormat=application%2Fjson",

    color:['#edf8fb','#bfd3e6','#9ebcda','#8c96c6','#8856a7','#810f7c'],
    break:[0,200,400,600,800,1000]},

    3:{attributename:"Black Smoker",
    id:3,
    geojson_url:"https://smartcommunityhealth.ahc.umn.edu/lung_cancer/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lung_cancer%3Amn_smoker_ethnicity&viewparams=ethnicity:Black&propertyName=geo_id,brfss_smoker&outputFormat=application%2Fjson",
    color:['#edf8fb','#bfd3e6','#9ebcda','#8c96c6','#8856a7','#810f7c'],
    break:[0,200,400,600,800,1000]},

    4:{attributename:"Asian Smoker",
    id:4,
    geojson_url:"https://smartcommunityhealth.ahc.umn.edu/lung_cancer/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lung_cancer%3Amn_smoker_ethnicity&viewparams=ethnicity:Asian&propertyName=geo_id,brfss_smoker&outputFormat=application%2Fjson",
    color:['#edf8fb','#bfd3e6','#9ebcda','#8c96c6','#8856a7','#810f7c'],
    break:[0,200,400,600,800,1000]}
    
    




}