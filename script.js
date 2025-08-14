// ------------------------
// Magic Potion Shop Game
// ------------------------

(function () {
  // --- بخش 1: خوش‌آمدگویی ---
  let playerName = prompt("What's your name?");
  if (!playerName) playerName = "Student";

  let ageRaw = prompt("How old are you?");
  let age = Number(ageRaw);
  if (!Number.isFinite(age)) age = 0;

  let element = prompt("Favorite element? (fire, water, earth, air)");
  element = (element || "mystery").trim().toLowerCase();

  alert(
    `Welcome ${playerName}! At ${age}, you're just the right age to master the powers of ${element}!`
  );

  // --- بخش 2: انبار اولیه ---
  let potions = [
    "Healing Potion",
    "Mana Elixir",
    "Invisibility Draft",
    "Fire Resistance",
  ];
  let potionStock = {
    "Healing Potion": { quantity: 5, price: 10 },
    "Mana Elixir": { quantity: 3, price: 15 },
    "Invisibility Draft": { quantity: 2, price: 25 },
    "Fire Resistance": { quantity: 4, price: 20 },
  };

  let gold = 0;
  let customersServed = 0;
  let brewedCount = 0;

  // --- تابع normalize امن و بدون خطا ---
  function normalize(input) {
    const txt = (input || "").trim().toLowerCase();
    const map = {
      "healing potion": "Healing Potion",
      healing: "Healing Potion",
      "mana elixir": "Mana Elixir",
      mana: "Mana Elixir",
      "invisibility draft": "Invisibility Draft",
      invisibility: "Invisibility Draft",
      invis: "Invisibility Draft",
      "fire resistance": "Fire Resistance",
      fire: "Fire Resistance",
    };
    return map[txt] || null;
  }

  // --- ساخت متن منو ---
  function menuText() {
    let m = "Potion Menu:\n";
    for (const p of potions) {
      const info = potionStock[p];
      if (!info) continue;
      m += `${p} - Qty: ${info.quantity} - Price: ${info.price} gold\n`;
    }
    return m;
  }

  // --- بخش 3: سرویس به مشتری‌ها (۳ مشتری) ---
  for (let i = 1; i <= 3; i++) {
    const serveAns = (
      prompt(`Customer ${i} is here! Take their order? (yes/no)`) || ""
    )
      .trim()
      .toLowerCase();
    if (serveAns !== "yes") {
      alert("No more customers right now.");
      break;
    }

    alert(menuText());

    const choiceRaw = prompt("Which potion do they want?");
    const choice = normalize(choiceRaw);

    if (!choice) {
      alert("Sorry, we don't have that potion.");
      continue;
    }

    const item = potionStock[choice];
    if (item.quantity > 0) {
      item.quantity -= 1;
      gold += item.price;
      customersServed += 1;
      alert(`Sold 1 ${choice} for ${item.price} gold!`);
    } else {
      alert(`${choice} is out of stock!`);
    }
  }

  // --- بخش 4: دم کردن معجون ---
  function brewPotion(potionName, amount) {
    const p = normalize(potionName);
    const amt = Number(amount);

    if (!p) {
      alert("We don't know that potion!");
      return false;
    }
    if (!Number.isFinite(amt) || amt <= 0) {
      alert("Invalid amount.");
      return false;
    }

    potionStock[p].quantity += amt;
    brewedCount += amt;
    alert(`Brewed ${amt} of ${p}. New Qty: ${potionStock[p].quantity}`);
    return true;
  }

  for (let i = 1; i <= 3; i++) {
    const brewAns = (
      prompt(`Do you want to brew potions? Attempt ${i} (yes/no)`) || ""
    )
      .trim()
      .toLowerCase();
    if (brewAns !== "yes") break;

    const what = prompt("Which potion?");
    const howMany = prompt("How many?");
    brewPotion(what, howMany);
  }

  // --- بخش 5: گزارش پایان روز ---
  let report = `End of Day Report:
  Gold earned: ${gold}
  Customers served: ${customersServed}
  Potions brewed: ${brewedCount}
  
  Remaining stock:
  `;

  for (const [pName, { quantity }] of Object.entries(potionStock)) {
    report += `${pName}: ${quantity} left\n`;
  }
  alert(report);
})();
