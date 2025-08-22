import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

// Data sets
const OS_OPTIONS = [
  { version: "16_1_1", mobile: "20B101" },
  { version: "16_2", mobile: "20C65" },
  { version: "16_3_1", mobile: "20D67" },
  { version: "17_0_3", mobile: "21A360" },
  { version: "17_3_1", mobile: "21D61" },
  { version: "17_5_1", mobile: "21F90" },
  { version: "17_6_1", mobile: "21G93" },
  { version: "17_7_1", mobile: "21H216" },
  { version: "18_1", mobile: "22B83" },
  { version: "18_1_1", mobile: "22B91" },
  { version: "18_2", mobile: "22C152" },
  { version: "18_2_1", mobile: "22C161" },
  { version: "18_3", mobile: "22D5034e" },
  { version: "18_3_1", mobile: "22D72" },
  { version: "18_3_2", mobile: "22D82" },
  { version: "18_5", mobile: "22F76" },
];

const FBAV_OPTIONS = [
  "521.0.0.42.97",
  "520.0.0.44.99",
  "519.0.0.44.92",
  "523.0.0.39.61",
  "522.0.0.52.96",
  "518.0.0.63.86",
];

const FBBV_OPTIONS = [
  "753726094",
  "763693145",
  "760232234",
  "743277063",
  "746450682",
  "735017191",
  "740881359",
  "756351453",
];

const FBDV_MAP = {
  "16": ["iPhone14,7", "iPhone14,8", "iPhone15,2", "iPhone15,3"],
  "17": ["iPhone15,4", "iPhone15,5", "iPhone16,1", "iPhone16,2"],
  "18": ["iPhone17,3", "iPhone17,4", "iPhone17,1", "iPhone17,2"],
};

const FBRV_OPTIONS = [
  "680644226", "680322911", "680469061", "621632390", "681030704", "680568676",
  "681076370", "681139536", "681201580", "653715064", "681245869", "681417540",
  "681311148", "681558933", "681788640", "682160012", "681945070", "682241554",
  "651031300", "682594010", "682651530", "683081814", "682948902", "682998814",
  "684591905", "684552024", "685547697", "702334248", "709773866", "709959009",
  "709853509", "710721179", "708854960", "711680447", "716125254", "715382107",
  "712354525", "719983960", "719600518", "718473750", "717113040"
];

// Utility
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUserAgent() {
  const os = getRandomItem(OS_OPTIONS);
  const fbav = getRandomItem(FBAV_OPTIONS);
  const fbbv = getRandomItem(FBBV_OPTIONS);
  const fbrv = getRandomItem(FBRV_OPTIONS);

  const osMajor = os.version.split("_")[0];
  const fbdv = getRandomItem(FBDV_MAP[osMajor]);

  return `Mozilla/5.0 (iPhone; CPU iPhone OS ${os.version.replace(
    /_/g,
    "."
  )} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/${
    os.mobile
  } [FBAN/FBIOS;FBAV/${fbav};FBBV/${fbbv};FBDV/${fbdv};FBMD/iPhone;FBSN/iOS;FBSV/${os.version.replace(
    /_/g,
    "."
  )};FBSS/3;FBID/phone;FBLC/en_US;FBOP/5;FBRV/${fbrv};IABMV/1]`;
}

export default function UserAgentGenerator() {
  const [quantity, setQuantity] = useState(5);
  const [agents, setAgents] = useState([]);

  const handleGenerate = () => {
    const list = Array.from({ length: quantity }, () => generateUserAgent());
    setAgents(list);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(agents.join("\n"));
    alert("Copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([agents.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "user_agents.txt";
    link.click();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-2xl rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50">
          <CardContent className="space-y-6 p-6">
            <h2 className="text-2xl font-extrabold text-gray-800">
              📱 iPhone User Agent Generator
            </h2>

            <div className="flex items-center gap-4">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded-lg p-2 w-28 text-center shadow-sm focus:ring-2 focus:ring-blue-400"
              />
              <Button onClick={handleGenerate} className="rounded-xl shadow-md">
                Generate
              </Button>
              <Button
                variant="secondary"
                onClick={handleCopy}
                className="rounded-xl shadow-md"
              >
                Copy All
              </Button>
              <Button
                variant="outline"
                onClick={handleDownload}
                className="rounded-xl shadow-md"
              >
                Download TXT
              </Button>
            </div>

            <textarea
              readOnly
              value={agents.join("\n")}
              placeholder="Generated User Agents will appear here..."
              className="w-full h-96 border border-gray-300 rounded-xl p-4 font-mono text-sm shadow-inner bg-gray-50 focus:ring-2 focus:ring-blue-300"
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
