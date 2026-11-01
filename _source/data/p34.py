# Part 3 簡短對話 / Part 4 簡短獨白 — 每組 3 題
# k: 'conv' 或 'talk'；au: [(說話者, 台詞)]；zh: 中譯；g: 圖表（HTML，可省略）
# qs: (tag, question, [correct, d1, d2, d3], explanation)
S = [
# ================= Part 3 conversations =================
dict(k='conv', t='影印資料', au=[
 ('W', "Good morning, Jack. Could you do me a favor and make copies of these handouts? I need forty of them for the staff meeting tomorrow morning."),
 ('M', "Sure, but the copier on our floor is being repaired. I'll have to use the one in the marketing department."),
 ('W', "That's fine. Oh, and could you staple each set? There are three pages per handout."),
 ('M', "No problem. I'll bring them to your office before lunch.")],
 zh="女：早安 Jack，可以幫我把這些講義印出來嗎？明早員工會議要 40 份。男：好，不過我們這層的影印機在修，我得用行銷部那台。女：沒關係。對了，可以每份都釘起來嗎？每份三頁。男：沒問題，午餐前拿到妳辦公室。",
 qs=[
 ("主旨細節", "What does the woman ask the man to do?", ["Make copies of some documents", "Repair a copier", "Lead a staff meeting", "Contact the marketing department"], "女子開頭就說 make copies of these handouts。"),
 ("細節", "What problem does the man mention?", ["A machine is being fixed.", "A meeting has been canceled.", "Some pages are missing.", "An office is locked."], "男子說 the copier on our floor is being repaired，換句話說就是 a machine is being fixed。"),
 ("下一步", "When will the man deliver the handouts?", ["Before lunch", "Tomorrow morning", "At the end of the day", "During the meeting"], "最後一句 I'll bring them to your office before lunch。"),
 ]),
dict(k='conv', t='飯店訂房', au=[
 ('M', "Hello, Harbor View Hotel. How may I help you?"),
 ('W', "Hi, I'd like to book a room for three nights, from October twelfth. I'm attending a conference at the convention center nearby."),
 ('M', "Let me check... We have a standard room available, but the rooms with an ocean view are fully booked for those dates."),
 ('W', "A standard room is fine. Does the rate include breakfast?"),
 ('M', "Yes, and since you're attending the conference, you're also eligible for a ten percent discount. I'll just need your conference registration number.")],
 zh="男：港景飯店您好。女：我想訂 10 月 12 日起三晚，我要去附近會展中心參加研討會。男：標準房有空，但海景房那幾天都滿了。女：標準房就好，有含早餐嗎？男：有，而且您參加研討會可享九折，我需要您的報名編號。",
 qs=[
 ("目的", "Why is the woman calling?", ["To make a reservation", "To cancel a booking", "To register for a conference", "To complain about a room"], "I'd like to book a room，打來訂房。"),
 ("細節", "What does the man say about the ocean-view rooms?", ["They are not available.", "They are more expensive.", "They include breakfast.", "They are being renovated."], "fully booked = not available。"),
 ("細節", "What does the man ask the woman to provide?", ["A registration number", "A credit card number", "A copy of her passport", "A return date"], "I'll just need your conference registration number。"),
 ]),
dict(k='conv', t='新產品延期（三人對話）', au=[
 ('W', "Kevin, Raj, do you have a minute? I just heard from the factory that the new blenders won't be ready until the end of next month."),
 ('M', "That's a problem. We've already scheduled the product launch for the fifteenth."),
 ('M2', "Well, we could still hold the launch event, but take pre-orders instead of selling the blenders on the spot."),
 ('W', "That's a good idea, Raj. Customers could get a discount if they order in advance."),
 ('M', "Let's do it. I'll update the advertising materials this afternoon.")],
 zh="女：Kevin、Raj，有空嗎？工廠說新果汁機要到下個月底才能做好。男1：麻煩了，我們已經把發表會訂在 15 號。男2：發表會還是可以辦，只是改成接受預購，不當場賣。女：好主意，預購的客人可以打折。男1：就這麼辦，我今天下午更新廣告文宣。",
 qs=[
 ("主旨細節", "What problem are the speakers discussing?", ["A product will be delayed.", "A factory has closed.", "An advertisement contains errors.", "A price has increased."], "won't be ready until the end of next month → 產品延遲。"),
 ("細節", "What does Raj suggest?", ["Accepting advance orders", "Postponing the launch event", "Finding a new factory", "Lowering the price permanently"], "Raj（男2）說 take pre-orders，同義改寫成 accepting advance orders。"),
 ("下一步", "What will Kevin most likely do this afternoon?", ["Revise some promotional materials", "Call the factory", "Contact customers", "Book an event venue"], "Kevin 說 I'll update the advertising materials this afternoon。update ≈ revise、advertising ≈ promotional。"),
 ]),
dict(k='conv', t='會議室預約（意圖題）', au=[
 ('M', "Hi, Sandra. I need to reserve the large conference room for Thursday afternoon. Our clients from Osaka are visiting."),
 ('W', "Hmm, the sales team has it booked from one to four."),
 ('M', "Oh no. The clients' flight lands at noon, so two o'clock would have been perfect."),
 ('W', "Well, the room on the fifth floor is free all day. It's a bit smaller, but it has a brand-new video system."),
 ('M', "That should work. There will only be six of us anyway.")],
 zh="男：Sandra，我要預約週四下午的大會議室，大阪的客戶要來。女：嗯，業務部一點到四點訂走了。男：糟了，客戶中午落地，兩點最剛好。女：五樓的會議室整天都空著，小一點，但有全新的視訊設備。男：那可以，反正我們只有六個人。",
 qs=[
 ("目的", "Why does the man want to reserve a room?", ["To meet with visiting clients", "To hold a training session", "To interview job applicants", "To hold a team celebration"], "Our clients from Osaka are visiting。"),
 ("意圖", "What does the woman imply when she says, \"the sales team has it booked from one to four\"?", ["The room is not available at the requested time.", "The sales team should join the meeting.", "The meeting should be shortened.", "She will cancel the sales team's booking."], "意圖題要看上下文：男子要週四下午的房間，女子說業務部已經訂了 → 那個時段不能用。"),
 ("細節", "What does the woman say about the room on the fifth floor?", ["It has new equipment.", "It is larger.", "It needs to be cleaned.", "It is reserved on Thursday."], "it has a brand-new video system → new equipment。"),
 ]),
dict(k='conv', t='面試安排', au=[
 ('W', "Hello, this is Grace Liu from Bellwood Engineering. I'm calling about the project coordinator position you applied for."),
 ('M', "Oh, hello! Thank you for calling."),
 ('W', "We were impressed with your application, and we'd like to invite you for an interview next Tuesday at ten."),
 ('M', "I'd love to come, but I have a final exam that morning. Would it be possible to meet in the afternoon?"),
 ('W', "Let me see... Yes, three o'clock is open. Please bring samples of projects you've managed.")],
 zh="女：我是 Bellwood 工程的 Grace Liu，打來是關於你應徵的專案協調員職位。男：您好，謝謝來電。女：我們對你的申請印象深刻，想邀你下週二十點面試。男：我很想去，但那天早上有期末考，可以改下午嗎？女：三點可以，請帶你負責過的專案範例。",
 qs=[
 ("說話者身分", "Who most likely is the man?", ["A job applicant", "A project manager at Bellwood", "A university professor", "An engineering client"], "the position you applied for → 他是應徵者。"),
 ("細節", "Why does the man ask to change the time?", ["He has an exam.", "He will be traveling.", "He has another interview.", "He lives far away."], "I have a final exam that morning。"),
 ("細節", "What is the man asked to bring?", ["Examples of his work", "A letter of reference", "A copy of his diploma", "Identification"], "samples of projects you've managed = examples of his work。"),
 ]),
dict(k='conv', t='餐廳外燴（圖表題）', au=[
 ('M', "Hi, I'm organizing a retirement party for a colleague next Friday, and I'd like to order catering for about twenty-five people."),
 ('W', "Certainly. Have you looked at our package options?"),
 ('M', "Yes. We'd like to have both hot dishes and dessert, but we don't need drinks. We'll buy those ourselves."),
 ('W', "Then this package would be perfect for you. We can deliver it to your office at noon."),
 ('M', "Great. I'll pay the deposit online today.")],
 zh="男：我下週五要幫同事辦退休派對，想訂大約 25 人的外燴。女：好的，看過我們的套餐了嗎？男：看了，我們要熱食和甜點，但不需要飲料，我們自己買。女：那這個套餐最適合，中午可以送到辦公室。男：太好了，我今天線上付訂金。",
 g='<table class="gtab"><caption>Catering Packages（每人價格）</caption><tr><th>Package</th><th>Includes</th><th>Price</th></tr><tr><td>Basic</td><td>Sandwiches, salad</td><td>$12</td></tr><tr><td>Classic</td><td>Hot dishes, drinks</td><td>$18</td></tr><tr><td>Deluxe</td><td>Hot dishes, dessert</td><td>$22</td></tr><tr><td>Premium</td><td>Hot dishes, dessert, drinks</td><td>$27</td></tr></table>',
 qs=[
 ("目的", "What event is the man planning?", ["A retirement party", "A product launch", "A client dinner", "A training workshop"], "a retirement party for a colleague。"),
 ("圖表", "Look at the graphic. How much per person will the man most likely pay?", ["$22", "$12", "$18", "$27"], "要熱食＋甜點、不要飲料 → Deluxe，每人 22 美元。圖表題要把聽到的條件對照表格。"),
 ("下一步", "What will the man do today?", ["Make a payment", "Visit the restaurant", "Send a guest list", "Buy some drinks"], "I'll pay the deposit online today。"),
 ]),
dict(k='conv', t='電腦故障', au=[
 ('W', "Hi, is this the IT help desk? My computer keeps shutting down whenever I open the accounting software."),
 ('M', "That sounds like the update we installed last night. A few other people have had the same issue."),
 ('W', "I really need it today. I have to finish the monthly payroll by five."),
 ('M', "I understand. I'll come up to your desk in about ten minutes. In the meantime, you could use the laptop in the meeting room—it hasn't been updated yet.")],
 zh="女：資訊服務台嗎？我一開會計軟體電腦就關機。男：應該是昨晚裝的更新，已經有幾個人遇到同樣問題。女：我今天真的需要，五點前要做完當月薪資。男：了解，我大約十分鐘後上去。這段時間妳可以先用會議室那台筆電，它還沒更新。",
 qs=[
 ("說話者身分", "Who most likely is the man?", ["A technical support worker", "An accountant", "A software salesperson", "A building manager"], "IT help desk 的人員。"),
 ("細節", "According to the man, what caused the problem?", ["A recent software update", "A power outage", "A computer virus", "An old battery"], "the update we installed last night。"),
 ("細節", "What does the man suggest the woman do?", ["Use a different computer", "Restart her computer", "Finish the work tomorrow", "Call the software company"], "use the laptop in the meeting room → a different computer。"),
 ]),
dict(k='conv', t='辦公室搬遷（三人對話）', au=[
 ('M', "So, the movers are coming on Saturday to take everything to the new office building. Is everyone's equipment packed?"),
 ('W', "Almost. The design team still needs boxes. We ran out yesterday."),
 ('W2', "I can pick some up from the supply store on my way in tomorrow."),
 ('M', "Thanks, Lucy. Also, remember that the new building requires security badges. Please make sure your team members have their photos taken by Thursday."),
 ('W', "Where do we go for that?"),
 ('M', "The security office on the ground floor of the new building.")],
 zh="男：搬家公司週六會把東西搬到新辦公大樓，大家的設備都打包好了嗎？女1：差不多，設計組還需要箱子，昨天用完了。女2：我明天上班路上去文具店拿一些。男：謝了 Lucy。另外，新大樓需要識別證，請確定組員週四前拍好照片。女1：要去哪裡拍？男：新大樓一樓的保全室。",
 qs=[
 ("主旨", "What are the speakers mainly discussing?", ["An office relocation", "A building renovation", "A new security policy", "A design project"], "movers、new office building → 辦公室搬遷。"),
 ("細節", "What does Lucy offer to do?", ["Get some boxes", "Pack equipment", "Take photographs", "Contact the movers"], "Lucy 說 I can pick some up（boxes）。"),
 ("細節", "What must employees do by Thursday?", ["Have their pictures taken", "Return their old badges", "Clean their desks", "Sign a form"], "have their photos taken by Thursday。"),
 ]),
dict(k='conv', t='包裹寄送', au=[
 ('M', "Hi, I'd like to send this package to Vancouver. How long will it take?"),
 ('W', "Standard shipping takes five to seven business days. Express shipping takes two days, but it costs about twice as much."),
 ('M', "It's a birthday gift for my sister, and her birthday is this Saturday."),
 ('W', "Then I'd recommend express. If you want, you can also add tracking for one dollar so you can check where it is online."),
 ('M', "Sure, let's do that.")],
 zh="男：我想把這個包裹寄到溫哥華，要多久？女：一般寄送五到七個工作天；快遞兩天，但價錢大約兩倍。男：這是給我妹妹的生日禮物，她的生日是這週六。女：那建議快遞。你也可以加一美元追蹤服務，在網路上查包裹位置。男：好，就這樣。",
 qs=[
 ("地點", "Where most likely does the conversation take place?", ["At a post office", "At a gift shop", "At an airport", "At a travel agency"], "寄包裹、運送方式 → 郵局或貨運櫃台。"),
 ("意圖", "Why does the man say, \"her birthday is this Saturday\"?", ["To explain that the package must arrive quickly", "To ask for gift wrapping", "To invite the woman to a party", "To request a discount"], "意圖題：他說生日在週六，是要表示包裹要快點到，所以店員建議 express。"),
 ("細節", "What does the man agree to pay extra for?", ["A tracking service", "Gift wrapping", "Insurance", "Home pickup"], "add tracking for one dollar → 男子說 Sure。"),
 ]),
dict(k='conv', t='健身房會員（圖表題）', au=[
 ('W', "Hi, I'm interested in joining the gym. I mostly want to use the swimming pool."),
 ('M', "Great. Our pool is open every day, but it's closed for cleaning on one weekday morning. Here's the schedule."),
 ('W', "Hmm, I usually swim before work, around seven. So I'd have to skip that day."),
 ('M', "Right. By the way, if you sign up this week, the registration fee is waived."),
 ('W', "Oh, that's nice. I'll fill out the form now.")],
 zh="女：我想加入健身房，主要想用游泳池。男：游泳池每天開，但平日有一個早上要清潔。這是時間表。女：我通常上班前七點左右游，那天就得跳過了。男：對。順帶一提，這週報名免入會費。女：真好，我現在就填表。",
 g='<table class="gtab"><caption>Pool Hours</caption><tr><th>Day</th><th>Hours</th></tr><tr><td>Monday</td><td>6:00 A.M. – 10:00 P.M.</td></tr><tr><td>Tuesday</td><td>6:00 A.M. – 10:00 P.M.</td></tr><tr><td>Wednesday</td><td>12:00 P.M. – 10:00 P.M.</td></tr><tr><td>Thursday</td><td>6:00 A.M. – 10:00 P.M.</td></tr><tr><td>Friday</td><td>6:00 A.M. – 9:00 P.M.</td></tr></table>',
 qs=[
 ("細節", "What facility is the woman most interested in?", ["The swimming pool", "The weight room", "The yoga studio", "The locker room"], "I mostly want to use the swimming pool。"),
 ("圖表", "Look at the graphic. Which day will the woman probably not swim?", ["Wednesday", "Monday", "Thursday", "Friday"], "她七點去游，只有週三中午才開 → 週三不能游。"),
 ("細節", "What does the man say about signing up this week?", ["There is no registration fee.", "A free towel is included.", "Membership is half price.", "Personal training is free."], "the registration fee is waived（免除）= there is no registration fee。"),
 ]),
dict(k='conv', t='供應商報價', au=[
 ('M', "Ms. Novak, I've reviewed the three quotes for the new office furniture. Morrison Supplies is the cheapest, but they can't deliver until March."),
 ('W', "That's too late. The new hires start on February first, and they'll need desks."),
 ('M', "Then I'd suggest Delta Interiors. They're only slightly more expensive, and they can deliver within two weeks."),
 ('W', "All right. Go ahead and place the order with them. And ask if they offer free assembly.")],
 zh="男：Novak 女士，我看過三家辦公家具的報價。Morrison 最便宜，但三月才能交貨。女：太晚了，新進員工 2 月 1 日報到，需要桌子。男：那建議 Delta Interiors，只貴一點點，兩週內可交貨。女：好，就向他們下單，並問他們有沒有免費組裝。",
 qs=[
 ("主旨", "What are the speakers discussing?", ["Purchasing furniture", "Hiring new staff", "Renovating an office", "Moving to a new location"], "office furniture 的報價。"),
 ("細節", "Why does the woman reject Morrison Supplies?", ["Its delivery date is too late.", "Its price is too high.", "Its products are low quality.", "It does not offer assembly."], "can't deliver until March，女子說 That's too late。"),
 ("下一步", "What does the woman ask the man to find out?", ["Whether assembly is included at no cost", "When the new employees will start", "How much the delivery fee is", "Which colors are available"], "ask if they offer free assembly。"),
 ]),
dict(k='conv', t='研討會報名', au=[
 ('W', "Did you register for the digital marketing seminar next month?"),
 ('M', "Not yet. I wanted to, but I heard it's already full."),
 ('W', "The morning session is, but they just opened an afternoon session because so many people were interested."),
 ('M', "Really? Then I'll sign up right away. Is the company paying for it?"),
 ('W', "Yes, just submit a training request form to your manager first.")],
 zh="女：你報名下個月的數位行銷研討會了嗎？男：還沒，本來想報，但聽說滿了。女：早上場滿了，但因為太多人有興趣，剛加開下午場。男：真的？那我馬上報。公司會出錢嗎？女：會，只要先交訓練申請表給你主管。",
 qs=[
 ("主旨", "What are the speakers mainly discussing?", ["A professional seminar", "A marketing campaign", "A job opening", "A company budget"], "digital marketing seminar。"),
 ("細節", "Why was an additional session added?", ["There was high demand.", "A speaker was unavailable.", "The venue changed.", "The morning session was canceled."], "because so many people were interested → high demand。"),
 ("細節", "What should the man do first?", ["Submit a form to his manager", "Pay a registration fee", "Contact the speaker", "Reserve a seat online"], "submit a training request form to your manager first。"),
 ]),
# ================= Part 4 talks =================
dict(k='talk', t='機場廣播', au=[
 ('N', "Attention, passengers on Pacific Air flight 482 to Sydney. Due to a mechanical issue, this flight will now depart from Gate 36 instead of Gate 22. The new departure time is 4:15 P.M. We apologize for the inconvenience. Passengers who would like a meal voucher may pick one up at the service counter near Gate 30. Thank you for your patience.")],
 zh="太平洋航空 482 號班機飛往雪梨的旅客請注意：因機械問題，本班機改由 36 號登機門出發，不是 22 號。新起飛時間為下午 4:15。造成不便，敬請見諒。需要餐券的旅客可到 30 號登機門附近的服務櫃台領取。感謝您的耐心。",
 qs=[
 ("地點", "Where is the announcement being made?", ["At an airport", "On an airplane", "At a train station", "At a travel agency"], "flight、gate、passengers → 機場。"),
 ("細節", "What has changed about the flight?", ["The departure gate", "The destination", "The airline", "The seat assignments"], "Gate 36 instead of Gate 22 → 登機門更改。"),
 ("細節", "What is being offered to passengers?", ["A meal voucher", "A free upgrade", "A hotel room", "A full refund"], "meal voucher。"),
 ]),
dict(k='talk', t='語音留言', au=[
 ('N', "Hi, this is Martin Reyes from Clearview Optometry, calling for Ms. Ellen Park. I'm calling to remind you of your eye examination appointment tomorrow, Wednesday, at 2:30. Please remember to bring your current glasses and your insurance card. If you need to reschedule, please call us at least twenty-four hours in advance, or a cancellation fee may apply. Our number is 555-0198. Thank you.")],
 zh="您好，我是 Clearview 眼科的 Martin Reyes，找 Ellen Park 小姐。提醒您明天週三 2:30 有眼睛檢查的預約，請記得帶目前的眼鏡和保險卡。如需改期請至少提前 24 小時來電，否則可能收取取消費。電話 555-0198，謝謝。",
 qs=[
 ("目的", "What is the purpose of the call?", ["To confirm an appointment", "To sell eyeglasses", "To request a payment", "To announce a new location"], "calling to remind you of your appointment → 提醒/確認預約。"),
 ("細節", "What should the listener bring?", ["An insurance card", "A medical history form", "A photo ID", "A prescription from a doctor"], "bring your current glasses and your insurance card。"),
 ("細節", "According to the speaker, why might a fee be charged?", ["If an appointment is changed late", "If a form is not completed", "If insurance does not cover the visit", "If glasses are lost"], "沒有提前 24 小時改期 → a cancellation fee may apply。"),
 ]),
dict(k='talk', t='新人訓練開場', au=[
 ('N', "Good morning, everyone, and welcome to Norton Financial. I'm Teresa Mills, head of Human Resources. Today's orientation will last until four o'clock. This morning, you'll learn about our company history and policies. After lunch, which will be served in the cafeteria on the second floor, you'll meet your department managers and get a tour of your work areas. Before we begin, please take a moment to make sure your name badge is correct. If there are any mistakes, let my assistant, Paul, know.")],
 zh="大家早安，歡迎加入 Norton 金融，我是人資主管 Teresa Mills。今天的新人訓練到四點。上午介紹公司歷史和規定；午餐在二樓員工餐廳，下午和部門主管見面並參觀工作區域。開始前請確認名牌是否正確，有錯請告訴我的助理 Paul。",
 qs=[
 ("聽眾", "Who most likely are the listeners?", ["New employees", "Department managers", "Potential clients", "Job applicants"], "welcome、orientation → 新進員工。"),
 ("細節", "What will happen after lunch?", ["Listeners will tour their work areas.", "Listeners will take a test.", "A company history video will be shown.", "Listeners will complete paperwork."], "After lunch... meet your department managers and get a tour of your work areas。"),
 ("下一步", "What are listeners asked to do before the session begins?", ["Check their name badges", "Turn off their phones", "Sign a contract", "Introduce themselves"], "make sure your name badge is correct。"),
 ]),
dict(k='talk', t='廣告', au=[
 ('N', "Is your home office too crowded? At Space Smart, we design custom storage solutions that fit any room. From wall-mounted shelves to hidden drawers, our designers will help you make the most of every square meter. And this month only, we're offering a free in-home consultation. Just visit our Web site to book an appointment. Space Smart—organize your space, organize your life.")],
 zh="你的居家辦公室太擠了嗎？Space Smart 設計適合任何房間的訂製收納方案，從壁掛層架到隱藏抽屜，設計師幫你善用每一平方公尺。本月限定提供免費到府諮詢，上網站預約即可。",
 qs=[
 ("主旨", "What is being advertised?", ["A storage design service", "An office rental company", "A furniture store's closing sale", "A cleaning service"], "custom storage solutions。"),
 ("細節", "What is offered this month only?", ["A free consultation", "Free delivery", "A discount on shelves", "An extended warranty"], "free in-home consultation。"),
 ("細節", "How can listeners make an appointment?", ["By visiting a Web site", "By calling a store", "By sending an e-mail", "By visiting a showroom"], "visit our Web site to book an appointment。"),
 ]),
dict(k='talk', t='會議開場（意圖題）', au=[
 ('N', "Thanks for joining today's meeting. As you know, our customer satisfaction scores dropped last quarter, mostly because of long wait times on the phone. Starting next month, we'll add an online chat option on our Web site so customers can get help without calling. Now, I know some of you are worried about extra work. Well, we're hiring five new support agents. I'll pass around the training schedule now—please choose a session that fits your schedule.")],
 zh="謝謝大家參加今天的會議。如各位所知，上一季顧客滿意度下降，主要是電話等待太久。下個月起網站會新增線上客服，讓顧客不用打電話也能得到協助。我知道有些人擔心工作量增加——嗯，我們會招聘五位新客服人員。我現在把訓練時間表傳下去，請選一個適合的場次。",
 qs=[
 ("細節", "What problem does the speaker mention?", ["Customers waited too long on the phone.", "A Web site was not working.", "Products were delivered late.", "Employees were working overtime."], "long wait times on the phone。"),
 ("意圖", "Why does the speaker say, \"we're hiring five new support agents\"?", ["To reassure listeners about their workload", "To ask listeners to recommend candidates", "To announce a promotion", "To explain a budget increase"], "前一句提到大家擔心額外工作，說要招五個人是在讓大家安心。"),
 ("下一步", "What will listeners do next?", ["Choose a training session", "Test a new chat system", "Call some customers", "Fill out a survey"], "please choose a session that fits your schedule。"),
 ]),
dict(k='talk', t='導覽解說', au=[
 ('N', "Welcome to the Riverside Chocolate Factory tour. My name is Oliver, and I'll be your guide today. The tour takes about an hour. We'll start in the roasting room, where cocoa beans are heated, and finish in our gift shop, where you can taste samples. For safety reasons, please stay with the group and don't touch any of the machines. Also, photography is not allowed inside the production area, but feel free to take pictures in the gift shop.")],
 zh="歡迎參觀河畔巧克力工廠，我是導覽員 Oliver。行程約一小時，從烘焙可可豆的烘焙室開始，最後到禮品店試吃。為了安全請跟緊團體、不要碰機器。生產區禁止拍照，但禮品店可以拍。",
 qs=[
 ("說話者身分", "Who is the speaker?", ["A tour guide", "A factory manager", "A safety inspector", "A shop clerk"], "I'll be your guide today。"),
 ("細節", "Where will the tour end?", ["In a gift shop", "In a roasting room", "In a parking area", "In a café"], "finish in our gift shop。"),
 ("細節", "What are listeners told not to do in the production area?", ["Take photographs", "Eat samples", "Talk loudly", "Use their phones"], "photography is not allowed inside the production area。"),
 ]),
dict(k='talk', t='路況報導', au=[
 ('N', "This is Radio 98.5 with your morning traffic update. Drivers heading downtown on Highway 9 should expect delays of up to thirty minutes because of road repairs near the Lincoln Bridge. Two lanes are closed until Friday. If possible, take Route 4 instead. Commuters may also want to consider the city's new express bus line, which started service yesterday. Stay tuned—after the news, we'll have the weekend weather forecast.")],
 zh="98.5 電台為您帶來早晨路況：往市中心的 9 號公路因林肯橋附近道路施工，預計延誤最多 30 分鐘，兩線車道封閉到週五。可以的話請改走 4 號公路。通勤族也可以考慮昨天開始營運的新快捷公車。請別轉台，新聞之後是週末天氣預報。",
 qs=[
 ("細節", "What is causing the delays?", ["Road repairs", "A traffic accident", "Bad weather", "A parade"], "because of road repairs。"),
 ("細節", "What does the speaker recommend?", ["Using a different route", "Leaving home earlier", "Working from home", "Parking near the bridge"], "take Route 4 instead。"),
 ("下一步", "What will listeners hear after the news?", ["A weather report", "A traffic update", "An interview", "Music"], "after the news, we'll have the weekend weather forecast。"),
 ]),
dict(k='talk', t='樓層指引（圖表題）', au=[
 ('N', "Hello, everyone, and welcome to the Greenfield Conference. Just a few announcements before we begin. Registration is on the first floor, next to the main entrance. Lunch will be served at noon. Please note that the keynote speech by Dr. Amira Hassan has been moved to a larger room because so many people signed up. It will now be held in the room next to the elevators on the third floor. Enjoy the conference!")],
 zh="大家好，歡迎參加 Greenfield 研討會。開始前幾項宣布：報到在一樓主入口旁。中午供應午餐。請注意，Amira Hassan 博士的主題演講因報名人數太多，改到較大的房間，地點在三樓電梯旁的那間。祝大家研討會愉快！",
 g='<table class="gtab"><caption>Third Floor</caption><tr><th>Room</th><th>Location</th><th>Seats</th></tr><tr><td>Room 301</td><td>Next to the elevators</td><td>300</td></tr><tr><td>Room 302</td><td>Next to the stairs</td><td>80</td></tr><tr><td>Room 303</td><td>Near the café</td><td>120</td></tr><tr><td>Room 304</td><td>End of the hall</td><td>60</td></tr></table>',
 qs=[
 ("細節", "Where is the registration desk?", ["Near the main entrance", "On the third floor", "Next to the café", "Beside the elevators"], "Registration is on the first floor, next to the main entrance。"),
 ("細節", "Why was the keynote speech moved?", ["Many people registered for it.", "The speaker arrived late.", "A room was being repaired.", "The schedule changed."], "because so many people signed up。"),
 ("圖表", "Look at the graphic. Where will the keynote speech be held?", ["Room 301", "Room 302", "Room 303", "Room 304"], "三樓電梯旁 = Room 301（也是座位最多的大房間）。"),
 ]),
dict(k='talk', t='頒獎致詞', au=[
 ('N', "Good evening. It's my great pleasure to present this year's Employee of the Year award to Hannah Cole from our customer service department. Over the past year, Hannah introduced a new system for tracking customer requests, which cut our response time in half. She also volunteered to train new team members every month. Hannah, please come up to the stage to receive your award—and a gift certificate for a weekend stay at the Lakeside Resort.")],
 zh="晚安。很榮幸頒發年度最佳員工獎給客服部的 Hannah Cole。過去一年她導入新的顧客需求追蹤系統，讓回應時間縮短一半，還自願每月訓練新同仁。Hannah，請上台領獎——還有湖畔度假村週末住宿禮券。",
 qs=[
 ("目的", "What is the purpose of the speech?", ["To present an award", "To introduce a new manager", "To announce a retirement", "To explain a new policy"], "present this year's Employee of the Year award。"),
 ("細節", "What did Hannah Cole do?", ["She reduced response times.", "She increased sales.", "She opened a new office.", "She designed a product."], "cut our response time in half。"),
 ("細節", "What will Hannah Cole receive in addition to the award?", ["A gift certificate", "A cash bonus", "Extra vacation days", "A promotion"], "a gift certificate for a weekend stay。"),
 ]),
dict(k='talk', t='產品使用說明', au=[
 ('N', "Thank you for purchasing the AquaPure water filter. Before using it for the first time, rinse the filter cartridge under cold water for about two minutes. This removes any dust from the manufacturing process. The cartridge should be replaced every three months. When the indicator light turns red, it's time to order a new one. You can buy replacement cartridges on our Web site, and if you subscribe, we'll ship them to you automatically at a discount.")],
 zh="感謝購買 AquaPure 濾水器。第一次使用前，請用冷水沖洗濾芯約兩分鐘，去除製程中的灰塵。濾芯每三個月更換一次，指示燈變紅就該訂新的。可以在網站購買替換濾芯；訂閱的話，我們會自動以折扣價寄給您。",
 qs=[
 ("細節", "What should listeners do before using the product for the first time?", ["Rinse a part with water", "Charge the battery", "Register the product online", "Read the safety manual"], "rinse the filter cartridge under cold water。"),
 ("細節", "What does a red light indicate?", ["A part needs to be replaced.", "The water is too hot.", "The product is turned off.", "The device needs cleaning."], "When the indicator light turns red, it's time to order a new one。"),
 ("細節", "What benefit do subscribers receive?", ["Discounted automatic deliveries", "Free installation", "A longer warranty", "Priority customer service"], "ship them to you automatically at a discount。"),
 ]),
]
