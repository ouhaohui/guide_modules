require.config({
    baseUrl:"guide_modules",
    paths:{
        "graphs":"graphs/graphs",
        "util"  : "util/util"
    }
});
define(['graphs','util'],function(graphs,util){
    console.log(graphs)
    window.graphs = graphs;
})