package back

class Utils {

    private static Random random = new Random()
    private static String letters = "0123456789ABCDEF"

    static String getRandomColor(){
        def color = new StringBuilder("#")
        for (int i in 1..6){
            color.append(letters.charAt(random.nextInt(letters.length())))
        }
        return color.toString()
    }

}
