function calculateRate (req, res) {
   var type = req.body.type;
   var weight = Number(req.body.weight);
   var tmp = Math.ceil(weight);
   var rate;

   switch (type) {
      case 'Letter (Stamped)':
         switch (tmp) {
            case 1:
               rate = .55;
               break;
            case 2:
               rate = .7;
               break;
            case 3:
               rate = .85;
               break;
            default:
               rate = 1;
               break;
         }
         break;
      case 'Letter (Metered)':
         switch (tmp) {
            case 1:
               rate = .5;
               break;
            case 2:
               rate = .65;
               break;
            case 3:
               rate = .8;
               break;
            default:
               rate = .95;
               break;
         }
         break;
      case 'Large Envelope (Flats)':
         switch (tmp) {
            case 1:
               rate = 1;
               break;
            case 2:
               rate = 1.15;
               break;
            case 3:
               rate = 1.3;
               break;
            case 4:
               rate = 1.45;
               break;
            case 5:
               rate = 1.6;
               break;
            case 6:
               rate = 1.75;
               break;
            case 7:
               rate = 1.9;
               break;
            case 8:
               rate = 2.05;
               break;
            case 9:
               rate = 2.2;
               break;
            case 10:
               rate = 2.35;
               break;
            case 11:
               rate = 2.5;
               break;
            case 12:
               rate = 2.65;
               break;
            default:
               rate = 2.8;
               break;
         }
         break;
      case 'First-Class Package Service—Retail':
         switch (tmp) {
            case 1:
            case 2:
            case 3:
            case 4:
               rate = 3.66;
               break;
            case 5:
            case 6:
            case 7:
            case 8:
               rate = 4.39;
               break;
            case 9:
            case 10:
            case 11:
            case 12:
               rate = 5.19;
               break;
            default:
               rate = 5.71;
               break;
         }
         break;
      default:
         rate = -1;
         break;
   }

   res.render('post_rate.ejs', { 'rate' : rate, 'type' : type, 'weight' : weight });
};

module.exports = {calculateRate : calculateRate};
