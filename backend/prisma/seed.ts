/// <reference types="node" />
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoryDefs = [
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Mobiles', slug: 'mobiles' },
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Beauty & Personal Care', slug: 'beauty' },
  { name: 'Home & Living', slug: 'home' },
  { name: 'Appliances', slug: 'appliances' },
  { name: 'Toys & Kids', slug: 'toys' },
  { name: 'Health & Care', slug: 'health' },
  { name: 'Furniture', slug: 'furniture' },
  { name: 'Books', slug: 'books' },
  { name: '2 Wheelers', slug: '2wheelers' },
];

const categoryImagePool: Record<string, string[]> = {
  'fashion': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80'
  ],
  'mobiles': [
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1574944985070-8f30c4397220?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1530319067432-f2a729c03db5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80'
  ],
  'electronics': [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=800&q=80'
  ],
  'beauty': [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1608248597349-4d6d6348c4cf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1614859265097-763478d53081?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556228722-d119f018d96d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80'
  ],
  'home': [
    'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&w=800&q=80'
  ],
  'appliances': [
    'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584269600519-112d071b35e6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585338061483-16a2491a4363?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586208958839-06c17cacdf09?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590794056226-77ef3a433752?auto=format&fit=crop&w=800&q=80'
  ],
  'toys': [
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558060370-d644479be6f7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533236897111-3e94666b2edf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1599658880436-c61792e70672?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80'
  ],
  'health': [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550572017-edf70602686c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512290900673-700244211f1e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
  ],
  'furniture': [
    'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541558869434-2840d308329a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506898667547-42e2b3a4fe52?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80&v=2'
  ],
  'books': [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1510172951991-856a654063f9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509021436468-d5103009571f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80'
  ],
  '2wheelers': [
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558981244-50854d909565?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558981806-189617711467?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558981001-5113fe0b088e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558981000-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558981396-5fcf84bdf14d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558981820-94a2b918a1a3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80&item=13',
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80&item=14',
    'https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=800&q=80&item=15',
    'https://images.unsplash.com/photo-1558981244-50854d909565?auto=format&fit=crop&w=800&q=80&item=16',
    'https://images.unsplash.com/photo-1558981806-189617711467?auto=format&fit=crop&w=800&q=80&item=17',
    'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80&item=18',
    'https://images.unsplash.com/photo-1558981001-5113fe0b088e?auto=format&fit=crop&w=800&q=80&item=19',
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80&item=20'
  ]
};

const categoryProductNames: Record<string, string[]> = {
  fashion: [
    'Nike Air Max 270 React Sneakers', 'Levi\'s 511 Slim Fit Denim Jeans', 'Adidas Ultraboost Light Running Shoes',
    'Puma Classic Suede Icon Sneakers', 'Ray-Ban Aviator Classic Sunglasses', 'Zara Oversized Urban Cotton Hoodie',
    'Tommy Hilfiger Tailored Slim Fit Shirt', 'Calvin Klein Monogram Bifold Wallet', 'Fossil Gen 6 Touchscreen Leather Watch',
    'Under Armour Tech 2.0 Short Sleeve Tee', 'Woodland Leather Outdoor Hiking Boots', 'FabIndia Handloom Silk Kurta Set',
    'Biba Embroidered Anarkali Suit', 'HRX Activewear Training Joggers', 'Allen Solly Casual Cotton Blazer',
    'Peter England Formal Dress Trousers', 'Vans Old Skool Canvas Skate Shoes', 'Superdry Graphic Print Heavyweight Hoodie',
    'Jack & Jones Slim Fit Chino Trousers', 'Crocs Classic Comfort Clogs',
  ],
  mobiles: [
    'Samsung Galaxy S24 Ultra 5G (256GB)', 'Apple iPhone 15 Pro Max (Natural Titanium)', 'Google Pixel 8 Pro (Bay Blue)',
    'OnePlus 12 5G (Flowy Emerald)', 'Xiaomi 14 Ultra (Black Titanium)', 'Vivo X100 Pro 5G (Asteroid Black)',
    'Realme GT 5 Pro (Red Rock Edition)', 'Nothing Phone (2) (Dark Grey)', 'Motorola Edge 50 Ultra 5G',
    'iQOO 12 5G (Legend White)', 'ASUS ROG Phone 8 Pro', 'POCO F6 Pro 5G', 'Apple iPhone 14 Plus',
    'Samsung Galaxy Z Fold 5 5G', 'Honor Magic 6 Pro 5G', 'OPPO Find X7 Ultra', 'Tecno Phantom V Fold 5G',
    'Infinix Zero 30 5G', 'Lava Agni 2 5G', 'Samsung Galaxy A55 5G',
  ],
  electronics: [
    'Sony WH-1000XM5 Wireless Headphones', 'Apple Watch Series 9 GPS 45mm', 'Bose QuietComfort Ultra Headphones',
    'Apple AirPods Pro (2nd Generation)', 'Samsung Galaxy Tab S9 Ultra', 'Dell XPS 15 4K OLED Laptop',
    'Apple MacBook Pro 16-Inch (M3 Max)', 'Logitech MX Master 3S Wireless Mouse', 'ASUS ROG Strix Scar 18 Laptop',
    'iPad Air 5th Gen (M1 Chip)', 'Sony PlayStation 5 Slim Console', 'Xbox Series X 1TB Gaming Console',
    'Nintendo Switch OLED Model', 'Marshall Stanmore III Bluetooth Speaker', 'GoPro HERO12 Black Action Camera',
    'Canon EOS R6 Mark II Camera', 'DJI Mini 4 Pro Drone Combo', 'Anker Prime 20,000mAh Power Bank',
    'Seagate One Touch 2TB External Hard Drive', 'Samsung T7 Shield 1TB Portable SSD',
  ],
  beauty: [
    'Dyson Airwrap Multi-Styler Complete Long', 'Estée Lauder Advanced Night Repair Serum', 'MAC Matte Lipstick (Ruby Woo)',
    'Clinique Moisture Surge 100H Hydrator', 'L\'Oréal Paris Revitalift Hyaluronic Acid Serum', 'Maybelline Lash Sensational Mascara',
    'The Ordinary Niacinamide 10% + Zinc 1%', 'Olaplex No. 3 Hair Perfector Treatment', 'CeraVe Hydrating Facial Cleanser',
    'Neutrogena Hydro Boost Water Gel', 'Kérastase Elixir Ultime Hair Oil', 'Urban Decay Naked3 Eyeshadow Palette',
    'Paula\'s Choice 2% BHA Liquid Exfoliant', 'Laneige Lip Sleeping Mask (Berry)', 'Forest Essentials Soundarya Radiance Cream',
    'Minimalist 10% Vitamin C Face Serum', 'Nykaa Matte to Last Liquid Lipstick', 'Plum Green Tea Alcohol-Free Toner',
    'Cetaphil Gentle Skin Cleanser', 'Chanel Coco Mademoiselle Eau de Parfum',
  ],
  home: [
    'DeLonghi Specialista Arte Espresso Machine', 'Philips Air Fryer XXL 5000 Series', 'Dyson V15 Detect Cordless Vacuum',
    'iRobot Roomba j7+ Robot Vacuum', 'Instant Pot Duo 7-in-1 Pressure Cooker', 'Nespresso Vertuo Pop Coffee Maker',
    'NutriBullet Ultra 1200W Personal Blender', 'Morphy Richards Toaster 4-Slice', 'Prestige Iris 750W Mixer Grinder',
    'Wipro Smart LED Table Lamp', 'Wonderchef Nutri-Blend Compact Blender', 'Borosil Glass Cookware Storage Set',
    'Hawkins Stainless Steel Contura Cooker', 'Kent Grand Plus Water Purifier', 'Sleepwell Dual Comfort Memory Foam Pillow',
    'Spaces 100% Cotton 300 TC Bedsheet', 'Solimo Stainless Steel Water Bottle Set', 'Milton Thermosteel Flip Lid Vacuum Flask',
    'Pigeon by Stovekraft Non-Stick Cookware Set', 'Godrej Aer Smart Automatic Air Freshener',
  ],
  appliances: [
    'LG 55-Inch 4K Smart OLED TV (C3 Series)', 'Samsung 65-Inch Neo QLED 4K Smart TV', 'Sony Bravia 55-Inch XR Full Array LED TV',
    'Daikin 1.5 Ton 5 Star Inverter Split AC', 'LG 322L 3 Star Frost Free Refrigerator', 'Samsung 8kg AI Front Load Washing Machine',
    'Bosch 13 Place Settings Free Standing Dishwasher', 'IFB 8.5kg Executive ZX Front Load Washer', 'Haier 596L Side-by-Side Refrigerator',
    'Voltas 1.5 Ton 3 Star Inverter Split AC', 'Whirlpool 265L 3 Star Double Door Refrigerator', 'Panasonic 1.5 Ton 5 Star Split AC',
    'Godrej 190L 5 Star Direct Cool Refrigerator', 'Blue Star 1.5 Ton 3 Star Split AC', 'Hindware Smart Appliances Chimney (90cm)',
    'Faber 60cm 1200 m3/hr Auto-Clean Chimney', 'Beko 8kg Condenser Tumble Dryer', 'Havells Monza EC 15L Water Heater',
    'Bajaj New Shakti Neo 15L Vertical Water Geyser', 'Crompton Ozone 75L Desert Air Cooler',
  ],
  toys: [
    'LEGO Technic Bugatti Bolide Building Kit', 'Hot Wheels 20-Car Gift Pack', 'Barbie Dreamhouse 3-Story Playset',
    'NERF Elite 2.0 Commander RD-6 Blaster', 'Hasbro Gaming Monopoly Board Game', 'Fisher-Price Kick & Play Piano Gym',
    'Play-Doh Ultimate Color Collection', 'Funskool Rubik\'s 3x3 Speed Cube', 'Maisto 1:18 Diecast Lamborghini Sian',
    'Beyblade Burst QuadStrike Battle Set', 'VTech Touch and Learn Activity Desk', 'PAW Patrol Mighty Pups Lookout Tower',
    'Transformers Studio Series Action Figure', 'UNO Card Game Tin Gift Box', 'Crayola Ultimate Light Board Tablet',
    'Melissa & Doug Wooden Building Blocks', 'Shumee Wooden Activity Walker', 'Sketchel Magnetic Drawing Board',
    'Smartivity DIY Hydraulic Crane STEM Toy', 'Mechanix Educational Metal Construction Set',
  ],
  health: [
    'Omron Platinum Wireless Blood Pressure Monitor', 'Dr Trust USA Fully Automatic Digital BP Monitor', 'Accu-Chek Instant Blood Glucose Kit',
    'Philips Sonicare ProtectiveClean Toothbrush', 'Oral-B Pro 3000 Rechargeable Toothbrush', 'Kore PVC 20kg Combo Gym Set',
    'Boldfit Heavy Duty Resistance Bands Set', 'Strauss Anti-Skid Yoga Mat 6mm', 'BeatXP Thermo Pro Deep Tissue Massage Gun',
    'Dr Physio Electric Full Body Massager', 'Sahayog Wellness Digital Infrared Thermometer', 'HealthSense Chef-Mate Digital Kitchen Scale',
    'Beurer FT 90 Non-Contact Clinical Thermometer', 'Control D Pulse Oximeter Fingertip Monitor', 'Flexnest Flexibell Adjustable Dumbbell',
    'Proline Fitness Motorized Treadmill', 'Reach Air Bike Exercise Fitness Cycle', 'Fast&Up Charge Natural Vitamin C Tablets',
    'Optimum Nutrition ON Gold Standard Whey', 'MuscleBlaze Biozyme Performance Whey',
  ],
  furniture: [
    'Ergonomic Mesh High-Back Office Chair', 'Wakefit Orthopedic Memory Foam Queen Mattress', 'RoyalOak Wooden Dining Table 6 Seater Set',
    'Green Soul Monster Ultimate Gaming Chair', 'Nilkamal Freedom Mini Medium Plastic Cabinet', 'Urban Ladder Solid Teak Wood King Bed',
    'Pepperfry Modern 3 Seater Fabric Sofa', 'Bluewud Express Wall Mount Study Table', 'Durian Executive Leatherette Ergonomic Chair',
    'Home Centre 4 Door Wardrobe with Mirror', 'DecorNation Solid Wood Bedside Table', 'Spacewood Winner Study Desk with Bookshelf',
    'Supreme Cameo Plastic Chair (Set of 4)', 'Sleepwell Spinetech Air Luxury Mattress', 'Solimo Sheesham Wood Coffee Center Table',
    'Story@Home Sheesham Wood Armchair', 'Story@Home Folding Wooden Wall Desk', 'Casastyle Leatherette L-Shape Sofa Set',
    'Astrix Gaming Desk with LED Lights', 'IKEA LINNMON Desk with ADILS Legs',
  ],
  books: [
    'Atomic Habits by James Clear (Hardcover)', 'The Psychology of Money by Morgan Housel', 'Rich Dad Poor Dad by Robert T. Kiyosaki',
    'Ikigai: The Japanese Secret to a Long & Happy Life', 'Deep Work by Cal Newport', 'Thinking, Fast and Slow by Daniel Kahneman',
    'The Subtle Art of Not Giving a F*ck by Mark Manson', 'Do It Today by Darius Foroux', 'Sapiens: A Brief History of Humankind',
    'The Alchemist by Paulo Coelho', 'Can\'t Hurt Me by David Goggins', 'Zero to One by Peter Thiel',
    'The Intelligent Investor by Benjamin Graham', 'Man\'s Search for Meaning by Viktor E. Frankl', 'Rework by Jason Fried & David Heinemeier',
    'Clean Code by Robert C. Martin', 'Designing Data-Intensive Applications', 'The Pragmatic Programmer by Andrew Hunt',
    'Python Crash Course by Eric Matthes', 'System Design Interview by Alex Xu',
  ],
  '2wheelers': [
    'Ather 450X Gen 3 Electric Scooter', 'Ola S1 Pro Gen 2 Electric Scooter', 'TVS iQube Electric Scooter',
    'Bajaj Chetak Premium Electric Scooter', 'Hero Vida V1 Pro Electric Scooter', 'Yamaha Aerox 155 Maxi Scooter',
    'TVS Jupiter 125 Disc Brake Scooter', 'Honda Activa 6G Premium Edition', 'Suzuki Access 125 Bluetooth Edition',
    'Royal Enfield Hunter 350 (Dapper White)', 'Royal Enfield Classic 350 (Chrome Red)', 'TVS Apache RTR 200 4V (Matte Blue)',
    'Yamaha YZF R15 V4 (Racing Blue)', 'KTM Duke 390 (Electronic Orange)', 'BMW G 310 GS Adventure Motorcycle',
    'Kawasaki Ninja 300 (Lime Green)', 'RE Meteor 350 Supernova Custom', 'Hero Splendor Plus XTEC',
    'Honda CB350 Highness (DLX Pro)', 'Revolt RV400 Electric Motorcycle',
  ],
};

async function main() {
  console.log('🌱 Seeding database with 220 items (20 items for each of the 11 categories)...');

  const catMap: Record<string, string> = {};

  for (const c of categoryDefs) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name },
      create: { name: c.name, slug: c.slug },
    });
    catMap[c.slug] = cat.id;
  }

  let count = 1;

  for (const c of categoryDefs) {
    const names = categoryProductNames[c.slug] || [];
    const images = categoryImagePool[c.slug] || categoryImagePool['electronics'];

    for (let i = 0; i < 20; i++) {
      const name = names[i] || `${c.name} Product #${i + 1}`;
      const img = images[i % images.length];
      const basePrice = Math.round((Math.sin(count) * 0.4 + 0.6) * 50000 + 499);
      const rating = Number((4.0 + (count % 10) * 0.1).toFixed(1));
      const stock = (count * 3) % 25 + 2;
      const numReviews = (count * 17) % 400 + 12;

      const prodData = {
        name,
        description: `High-quality ${name} featuring top brand reliability, official warranty, and fast ShopKaro delivery.`,
        price: basePrice,
        stock,
        rating,
        numReviews,
        images: [img],
        categoryId: catMap[c.slug],
      };

      const existing = await prisma.product.findFirst({ where: { name: prodData.name } });
      if (!existing) {
        await prisma.product.create({ data: prodData });
      }

      count++;
    }
  }

  console.log('✅ Successfully seeded 220 products across 11 categories!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
