<?php

namespace Database\Seeders;

use App\Models\Catalogs\Commune;
use App\Models\Catalogs\Wilaya;
use Illuminate\Database\Seeder;

class WilayaCommuneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 58 Official Wilayas of Algeria with representative communes
        $wilayas = [
            ['code' => '01', 'name_fr' => 'Adrar', 'name_ar' => 'أدرار', 'name_en' => 'Adrar', 'communes' => ['Adrar', 'Tamest', 'Charouine', 'Reggane', 'In Zghmir', 'Tit', 'Aoulef', 'Timimoun']],
            ['code' => '02', 'name_fr' => 'Chlef', 'name_ar' => 'الشلف', 'name_en' => 'Chlef', 'communes' => ['Chlef', 'Ténès', 'El Karimia', 'Oued Fodda', 'Ouled Fares', 'Boukadir', 'Beni Haoua']],
            ['code' => '03', 'name_fr' => 'Laghouat', 'name_ar' => 'الأغواط', 'name_en' => 'Laghouat', 'communes' => ['Laghouat', 'Aflou', 'Ksar El Hirane', 'Ain Madhi', 'Brida', 'Hassi R’Mel']],
            ['code' => '04', 'name_fr' => 'Oum El Bouaghi', 'name_ar' => 'أم البواقي', 'name_en' => 'Oum El Bouaghi', 'communes' => ['Oum El Bouaghi', 'Ain Beida', 'Ain M’lila', 'Ain Fakroun', 'Sigus']],
            ['code' => '05', 'name_fr' => 'Batna', 'name_ar' => 'باتنة', 'name_en' => 'Batna', 'communes' => ['Batna', 'Barika', 'Ain Touta', 'Merouana', 'Arris', 'Tazoult', 'N’Gaous']],
            ['code' => '06', 'name_fr' => 'Béjaïa', 'name_ar' => 'بجاية', 'name_en' => 'Bejaia', 'communes' => ['Béjaïa', 'Akbou', 'Amizour', 'Sidi Aïch', 'El Kseur', 'Tichy', 'Aokas', 'Kherrata']],
            ['code' => '07', 'name_fr' => 'Biskra', 'name_ar' => 'بسكرة', 'name_en' => 'Biskra', 'communes' => ['Biskra', 'Tolga', 'Sidi Okba', 'Ouled Djellal', 'Zeribet El Oued', 'El Kantara']],
            ['code' => '08', 'name_fr' => 'Béchar', 'name_ar' => 'بشار', 'name_en' => 'Bechar', 'communes' => ['Béchar', 'Kenadsa', 'Abadla', 'Beni Ounif', 'Taghit']],
            ['code' => '09', 'name_fr' => 'Blida', 'name_ar' => 'البليدة', 'name_en' => 'Blida', 'communes' => ['Blida', 'Boufarik', 'Ouled Yaïch', 'Larbaa', 'Meftah', 'El Affroun', 'Mouzaïa', 'Beni Mered', 'Bougara']],
            ['code' => '10', 'name_fr' => 'Bouira', 'name_ar' => 'البويرة', 'name_en' => 'Bouira', 'communes' => ['Bouira', 'Lakhdaria', 'Sour El Ghouzlane', 'Ain Bessam', 'M’Chedallah', 'Kadiria']],
            ['code' => '11', 'name_fr' => 'Tamanrasset', 'name_ar' => 'تمنراست', 'name_en' => 'Tamanrasset', 'communes' => ['Tamanrasset', 'Abalessa', 'In Amguel', 'Tazrouk', 'Idles']],
            ['code' => '12', 'name_fr' => 'Tébessa', 'name_ar' => 'تبسة', 'name_en' => 'Tebessa', 'communes' => ['Tébessa', 'Cheria', 'Bir El Ater', 'El Aouinet', 'Ouenza', 'Negrine']],
            ['code' => '13', 'name_fr' => 'Tlemcen', 'name_ar' => 'تلمسان', 'name_en' => 'Tlemcen', 'communes' => ['Tlemcen', 'Mansourah', 'Maghnia', 'Chetouane', 'Remchi', 'Ghazaouet', 'Nedroma', 'Sebdou']],
            ['code' => '14', 'name_fr' => 'Tiaret', 'name_ar' => 'تيارت', 'name_en' => 'Tiaret', 'communes' => ['Tiaret', 'Sougueur', 'Frenda', 'Ksar Chellala', 'Mahdia', 'Rahouia']],
            ['code' => '15', 'name_fr' => 'Tizi Ouzou', 'name_ar' => 'تيزي وزو', 'name_en' => 'Tizi Ouzou', 'communes' => ['Tizi Ouzou', 'Azazga', 'Draa Ben Khedda', 'Tigzirt', 'Bogbni', 'Larbaa Nath Irathen', 'Ain El Hammam']],
            ['code' => '16', 'name_fr' => 'Alger', 'name_ar' => 'الجزائر', 'name_en' => 'Algiers', 'communes' => ['Alger Centre', 'Sidi M’Hamed', 'El Madania', 'Belouizdad', 'Bab El Oued', 'Casbah', 'Oued Koriche', 'Bir Mourad Raïs', 'El Biar', 'Bouzareah', 'Birkhadem', 'El Harrach', 'Baraki', 'Kouba', 'Hussein Dey', 'Hydra', 'Bachdjerrah', 'Dar El Beïda', 'Bab Ezzouar', 'Bordj El Kiffan', 'Bordj El Bahri', 'Rouïba', 'Reghaïa', 'Ain Taya', 'Zeralda', 'Staoueli', 'Cheraga', 'Dely Ibrahim', 'Beni Messous', 'Draria', 'Douera', 'Birtouta', 'Saoula', 'Ouled Chebel']],
            ['code' => '17', 'name_fr' => 'Djelfa', 'name_ar' => 'الجلفة', 'name_en' => 'Djelfa', 'communes' => ['Djelfa', 'Ain Oussera', 'Messaad', 'Hassi Bahbah', 'Charef', 'Dar Chioukh', 'El Idrissia']],
            ['code' => '18', 'name_fr' => 'Jijel', 'name_ar' => 'جيجل', 'name_en' => 'Jijel', 'communes' => ['Jijel', 'Taher', 'El Milia', 'El Aouana', 'Ziama Mansouriah', 'Chekfa']],
            ['code' => '19', 'name_fr' => 'Sétif', 'name_ar' => 'سطيف', 'name_en' => 'Setif', 'communes' => ['Sétif', 'El Eulma', 'Ain Oulmene', 'Ain Arnat', 'Bougaa', 'Ain Azel', 'Beni Aziz']],
            ['code' => '20', 'name_fr' => 'Saïda', 'name_ar' => 'سعيدة', 'name_en' => 'Saida', 'communes' => ['Saïda', 'Youb', 'Ain El Hadjar', 'Ouled Brahim', 'Hassasna']],
            ['code' => '21', 'name_fr' => 'Skikda', 'name_ar' => 'سكيكدة', 'name_en' => 'Skikda', 'communes' => ['Skikda', 'El Hadaiek', 'Azzaba', 'Collo', 'Tamalous', 'Ben Azzouz', 'Ramdane Djamel']],
            ['code' => '22', 'name_fr' => 'Sidi Bel Abbès', 'name_ar' => 'سيدي بلعباس', 'name_en' => 'Sidi Bel Abbes', 'communes' => ['Sidi Bel Abbès', 'Telagh', 'Ben Badis', 'Sfisef', 'Ain El Berd', 'Ras El Ma']],
            ['code' => '23', 'name_fr' => 'Annaba', 'name_ar' => 'عنابة', 'name_en' => 'Annaba', 'communes' => ['Annaba', 'El Bouni', 'El Hadjar', 'Sidi Amar', 'Berrahal', 'Ain El Berda', 'Seraïdi']],
            ['code' => '24', 'name_fr' => 'Guelma', 'name_ar' => 'قالمة', 'name_en' => 'Guelma', 'communes' => ['Guelma', 'Oued Zenati', 'Bouchegouf', 'Héliopolis', 'Hammam Debagh']],
            ['code' => '25', 'name_fr' => 'Constantine', 'name_ar' => 'قسنطينة', 'name_en' => 'Constantine', 'communes' => ['Constantine', 'El Khroub', 'Ali Mendjeli', 'Hamma Bouziane', 'Didouche Mourad', 'Ain Smara', 'Zighoud Youcef']],
            ['code' => '26', 'name_fr' => 'Médéa', 'name_ar' => 'المدية', 'name_en' => 'Medea', 'communes' => ['Médéa', 'Berrouaghia', 'Ksar Boukhari', 'Beni Slimane', 'Tablat', 'Ouzera']],
            ['code' => '27', 'name_fr' => 'Mostaganem', 'name_ar' => 'مستغانم', 'name_en' => 'Mostaganem', 'communes' => ['Mostaganem', 'Ain Nouïssy', 'Hassi Mameche', 'Sidi Ali', 'Bouguirat', 'Ain Tedeles']],
            ['code' => '28', 'name_fr' => 'M’Sila', 'name_ar' => 'المسيلة', 'name_en' => 'M\'Sila', 'communes' => ['M’Sila', 'Boussaâda', 'Sidi Aïssa', 'Magra', 'Ain El Hadjel', 'Hammam Dhalaa']],
            ['code' => '29', 'name_fr' => 'Mascara', 'name_ar' => 'معسكر', 'name_en' => 'Mascara', 'communes' => ['Mascara', 'Sig', 'Mohammadia', 'Tighennif', 'Ghriss', 'Oued El Abtal']],
            ['code' => '30', 'name_fr' => 'Ouargla', 'name_ar' => 'ورقلة', 'name_en' => 'Ouargla', 'communes' => ['Ouargla', 'Hassi Messaoud', 'Rouissat', 'N’Goussa', 'Sidi Khouiled']],
            ['code' => '31', 'name_fr' => 'Oran', 'name_ar' => 'وهران', 'name_en' => 'Oran', 'communes' => ['Oran', 'Bir El Djir', 'Es Senia', 'Arzew', 'Ain El Turk', 'Bethioua', 'Oued Tlelat', 'Boutlelis', 'Gdyel']],
            ['code' => '32', 'name_fr' => 'El Bayadh', 'name_ar' => 'البيض', 'name_en' => 'El Bayadh', 'communes' => ['El Bayadh', 'Brezina', 'Labiodh Sidi Cheikh', 'Bougtob', 'El Abiodh Sidi Cheikh']],
            ['code' => '33', 'name_fr' => 'Illizi', 'name_ar' => 'إليزي', 'name_en' => 'Illizi', 'communes' => ['Illizi', 'Djanet', 'In Amenas', 'Bordj Omar Driss']],
            ['code' => '34', 'name_fr' => 'Bordj Bou Arréridj', 'name_ar' => 'برج بوعريريج', 'name_en' => 'Bordj Bou Arreridj', 'communes' => ['Bordj Bou Arréridj', 'Ras El Oued', 'Mansoura', 'Bordj Ghedir', 'El Achir']],
            ['code' => '35', 'name_fr' => 'Boumerdès', 'name_ar' => 'بومرداس', 'name_en' => 'Boumerdes', 'communes' => ['Boumerdès', 'Khemis El Khechna', 'Boudouaou', 'Dellys', 'Zemmouri', 'Thenia', 'Isser', 'Baghlia']],
            ['code' => '36', 'name_fr' => 'El Tarf', 'name_ar' => 'الطارف', 'name_en' => 'El Tarf', 'communes' => ['El Tarf', 'El Kala', 'Ben M’Hidi', 'Besbes', 'Drean', 'Bouhadjar']],
            ['code' => '37', 'name_fr' => 'Tindouf', 'name_ar' => 'تندوف', 'name_en' => 'Tindouf', 'communes' => ['Tindouf', 'Oum El Assel']],
            ['code' => '38', 'name_fr' => 'Tissemsilt', 'name_ar' => 'تيسمسيلت', 'name_en' => 'Tissemsilt', 'communes' => ['Tissemsilt', 'Theniet El Had', 'Bordj Bounaama', 'Khemisti', 'Lardjem']],
            ['code' => '39', 'name_fr' => 'El Oued', 'name_ar' => 'الوادي', 'name_en' => 'El Oued', 'communes' => ['El Oued', 'Robbah', 'Debila', 'Guemar', 'Magrane', 'Reguiba']],
            ['code' => '40', 'name_fr' => 'Khenchela', 'name_ar' => 'خنشلة', 'name_en' => 'Khenchela', 'communes' => ['Khenchela', 'Kais', 'Chechar', 'El Hamma', 'Ouled Rechache']],
            ['code' => '41', 'name_fr' => 'Souk Ahras', 'name_ar' => 'سوق أهراس', 'name_en' => 'Souk Ahras', 'communes' => ['Souk Ahras', 'Sedrata', 'M’Daourouch', 'Taoura', 'Merahna']],
            ['code' => '42', 'name_fr' => 'Tipaza', 'name_ar' => 'تيبازة', 'name_en' => 'Tipaza', 'communes' => ['Tipaza', 'Kolea', 'Cherchell', 'Bou Ismaïl', 'Hadjout', 'Fouka', 'Gouraya', 'Ahmer El Ain']],
            ['code' => '43', 'name_fr' => 'Mila', 'name_ar' => 'ميلة', 'name_en' => 'Mila', 'communes' => ['Mila', 'Chelghoum Laid', 'Tadjenanet', 'Ferdjioua', 'Grarem Gouga', 'Oued Endja']],
            ['code' => '44', 'name_fr' => 'Aïn Defla', 'name_ar' => 'عين الدفلى', 'name_en' => 'Ain Defla', 'communes' => ['Aïn Defla', 'Khemis Miliana', 'Miliana', 'El Attaf', 'Djelida', 'Rouina']],
            ['code' => '45', 'name_fr' => 'Naâma', 'name_ar' => 'النعامة', 'name_en' => 'Naama', 'communes' => ['Naâma', 'Mecheria', 'Ain Sefra', 'Tiout', 'Asla', 'Sfissifa']],
            ['code' => '46', 'name_fr' => 'Aïn Témouchent', 'name_ar' => 'عين تموشنت', 'name_en' => 'Ain Temouchent', 'communes' => ['Aïn Témouchent', 'Beni Saf', 'Hammam Bouhadjar', 'El Malah', 'El Amria']],
            ['code' => '47', 'name_fr' => 'Ghardaïa', 'name_ar' => 'غرداية', 'name_en' => 'Ghardaia', 'communes' => ['Ghardaïa', 'Metlili', 'El Guerrara', 'Dhayet Bendhahoua', 'Berriane', 'Bounoura']],
            ['code' => '48', 'name_fr' => 'Relizane', 'name_ar' => 'غليزان', 'name_en' => 'Relizane', 'communes' => ['Relizane', 'Oued Rhiou', 'Mazouna', 'Yellel', 'Ammi Moussa', 'Zemmoura']],
            ['code' => '49', 'name_fr' => 'El M’Ghair', 'name_ar' => 'المغير', 'name_en' => 'El M\'Ghair', 'communes' => ['El M’Ghair', 'Djamaa', 'Oum Touyour', 'Sidi Amrane']],
            ['code' => '50', 'name_fr' => 'El Meniaa', 'name_ar' => 'المنيعة', 'name_en' => 'El Menia', 'communes' => ['El Meniaa', 'Hassi Gara', 'Hassi Fehal']],
            ['code' => '51', 'name_fr' => 'Ouled Djellal', 'name_ar' => 'أولاد جلال', 'name_en' => 'Ouled Djellal', 'communes' => ['Ouled Djellal', 'Sidi Khaled', 'Ras El Miaad', 'Besbes']],
            ['code' => '52', 'name_fr' => 'Bordj Baji Mokhtar', 'name_ar' => 'برج باجي مختار', 'name_en' => 'Bordj Badji Mokhtar', 'communes' => ['Bordj Baji Mokhtar', 'Timiaouine']],
            ['code' => '53', 'name_fr' => 'Béni Abbès', 'name_ar' => 'بني عباس', 'name_en' => 'Beni Abbes', 'communes' => ['Béni Abbès', 'Kerzaz', 'Tabelbala', 'El Ouata', 'Igli']],
            ['code' => '54', 'name_fr' => 'Timimoun', 'name_ar' => 'تيميمون', 'name_en' => 'Timimoun', 'communes' => ['Timimoun', 'Aougrout', 'Tinerkouk', 'Charouine', 'Deldoul']],
            ['code' => '55', 'name_fr' => 'Touggourt', 'name_ar' => 'تقرت', 'name_en' => 'Touggourt', 'communes' => ['Touggourt', 'Nezla', 'Tebesbest', 'Megarine', 'Taibet', 'Temacine']],
            ['code' => '56', 'name_fr' => 'Djanet', 'name_ar' => 'جانت', 'name_en' => 'Djanet', 'communes' => ['Djanet', 'Bordj El Haouas']],
            ['code' => '57', 'name_fr' => 'In Salah', 'name_ar' => 'عين صالح', 'name_en' => 'In Salah', 'communes' => ['In Salah', 'In Ghar', 'Foggaret Ezzaouia']],
            ['code' => '58', 'name_fr' => 'In Guezzam', 'name_ar' => 'عين قزام', 'name_en' => 'In Guezzam', 'communes' => ['In Guezzam', 'Tin Zaouatine']],
        ];

        foreach ($wilayas as $item) {
            $wilaya = Wilaya::updateOrCreate(
                ['code' => $item['code']],
                [
                    'name_fr' => $item['name_fr'],
                    'name_ar' => $item['name_ar'],
                    'name_en' => $item['name_en'],
                    'is_active' => true,
                ]
            );

            if (! empty($item['communes'])) {
                foreach ($item['communes'] as $index => $communeName) {
                    Commune::updateOrCreate(
                        [
                            'wilaya_id' => $wilaya->id,
                            'name_fr' => $communeName,
                        ],
                        [
                            'code' => $item['code'].str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT),
                            'name_ar' => null,
                            'name_en' => $communeName,
                            'is_active' => true,
                        ]
                    );
                }
            }
        }
    }
}
